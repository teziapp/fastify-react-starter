import { env } from "../configs/env.config"
import { protectedProcedure, publicProcedure, router } from "../context.trpc"
import { USER_TOKEN } from "./cookies"

export const authApi = router({
	logout: publicProcedure.mutation(({ ctx }) => {
		ctx.res.setCookie(USER_TOKEN, '', {
			httpOnly: true,
			path: '/',
			secure: env.ENVIRONMENT === 'prod',
			signed: env.ENVIRONMENT === 'prod',
			maxAge: 0
		});

		return;
	}),
	profile: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.user;
    return user;
  }),
})
