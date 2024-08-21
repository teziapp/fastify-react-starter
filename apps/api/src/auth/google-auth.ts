import { fastifyOauth2 } from '@fastify/oauth2'
import { FastifyPluginAsync } from 'fastify'
import { fastifyPlugin } from 'fastify-plugin'
import { env } from "../configs/env.config"
import { USER_TOKEN } from "./cookies"
import { createToken } from "./create-token"
import { upsertUser } from "../services/user.service"
import z from 'zod'
import { OAuth2Namespace } from '@fastify/oauth2';

declare module 'fastify' {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}
export const googleUserSchema = z.object({
	email: z.string(),
	family_name: z.string(),
	given_name: z.string(),
	id: z.string(),
	locale: z.string().default('en'),
	name: z.string(),
	picture: z.string(),
	verified_email: z.boolean(),
})


const isProduction = env.ENVIRONMENT === 'prod'

export const googleAuth: FastifyPluginAsync = fastifyPlugin(async (fastify) => {
  fastify.register(fastifyOauth2, {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: env.GOOGLE_CLIENT_ID,
        secret: env.GOOGLE_CLIENT_SECRET
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION
    },
    startRedirectPath: '/auth/login/google',
    callbackUri: `${env.VITE_BE_URL}/auth/login/google/callback`
  })

  fastify.get('/auth/login/google/callback', async function (request, reply) {
    try {
      const result = await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(request)
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${result.token.access_token}`
        }
      })
      const userData = await response.json()
      const user = googleUserSchema.parse(userData)

      const dbUser = await upsertUser({
        email: user.email,
        name: user.name,
        profilePicture: user.picture,
        createdAt: null,
        updatedAt: null,
        isVerified: Boolean(user.verified_email||false),
        lastLoginAt: null,
      })
      const token = createToken(
        {
          ...dbUser,
          // 7 days
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        },
        env.JWT_SECRET
      )

      const inSevenDays = new Date()
      inSevenDays.setDate(inSevenDays.getDate() + 7)

      reply
        .setCookie(USER_TOKEN, token, {
          expires: inSevenDays,
          httpOnly: true,
          path: '/',
          secure: isProduction,
          signed: isProduction,
        })
        .redirect(env.FRONTEND_URL)
    } catch (error) {
      reply.send(error)
    }
  })
})