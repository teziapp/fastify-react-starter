import { OAuth2Namespace } from "@fastify/oauth2";
import {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { env } from "./configs/env.config";
import { addNewUser, getUserByEmail } from "./services/user.service";

declare module "fastify" {
  interface FastifyInstance {
    googleOAuth2: OAuth2Namespace;
  }
}

export const authRouter = (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) => {
  fastify.get("/login/failed", (_, reply: FastifyReply) => {
    reply.status(401).send({ message: "Login Failed" });
  });

  fastify.post("/logout", async (req: FastifyRequest, reply: FastifyReply) => {
    req.log.debug("logout");

    reply.clearCookie("session", {
      path: "/",
      domain: new URL(env.FRONTEND_URL as string).hostname,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    console.log("sending response of logout");
    reply.send({ message: "Logged out" });
  });

  fastify.get(
    "/google/callback",
    async (req: FastifyRequest, reply: FastifyReply) => {
      try {
        const { token: googleToken } =
          await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
            req
          );

        if (!googleToken) {
          throw new Error("Failed to get Google token");
        }

        const userInfoResponse = await fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${googleToken.access_token}`,
            },
          }
        );

        if (!userInfoResponse.ok) {
          throw new Error("Failed to fetch user info");
        }

        const userInfo = await userInfoResponse.json();

        if (!userInfo?.email) {
          throw new Error("Email not found in user info");
        }

        let user = await getUserByEmail(userInfo.email);

        if (!user) {
          user = await addNewUser({
            name: userInfo.name,
            email: userInfo.email,
            isVerified: userInfo.email_verified,
            profilePicture: userInfo.picture,
          });
        }

        const jwtToken = fastify.jwt.sign({ user }, { expiresIn: "7d" });

        reply.setCookie("session", jwtToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
          domain: new URL(env.FRONTEND_URL as string).hostname,
        });

        reply.redirect(`${env.FRONTEND_URL}/auth/success`);
      } catch (error) {
        req.log.error(error);
        reply.redirect("/auth/login/failed");
      }
    }
  );

  done();
};
