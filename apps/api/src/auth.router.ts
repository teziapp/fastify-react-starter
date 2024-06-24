import { OAuth2Namespace } from "@fastify/oauth2";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { env } from "./configs/env.config";
import { addNewUser, getUserByEmail } from "./services/user.service";

declare module "fastify" {
  interface FastifyInstance {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    googleOAuth2: OAuth2Namespace;
  }
}

export const authRouter = (
  fastify: FastifyInstance,
  _opts: FastifyPluginOptions,
  done: () => void
) => {
  fastify.get("/login/failed", (_, reply) => {
    reply.status(401).send({ message: "Login Failed" });
  });

  fastify.get("/logout", async (req, reply) => {
    req.server.log.debug("logout");
    // if (req.cookies.session) {
    //   const googleToken: Token = JSON.parse(req.cookies.session);
    //   await fastify.googleOAuth2.revokeAllToken(googleToken, undefined);
    //   console.info("logged out successfully");
    // }
    reply.clearCookie("session");

    reply.redirect(env.FRONTEND_URL);
  });

  fastify.get("/google/callback", async (req, reply) => {
    const { token: googleToken } =
      await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

    // if later need to refresh the token this can be used
    // const { token: newToken } = await this.getNewAccessTokenUsingRefreshToken(token)

    if (googleToken) {
      // FIXME: The tokeninfo endpoint is useful for debugging but for production purposes, retrieve Google's public keys from the keys endpoint and perform the validation locally.
      // https://developers.google.com/identity/openid-connect/openid-connect#validatinganidtoken
      const userInfo = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${googleToken.id_token}`
      ).then((res) => res.json());
      if (!userInfo?.email) {
        reply.redirect("/auth/login/failed");
        return;
      }

      reply.setCookie("googleToken", JSON.stringify(googleToken), {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: env.FRONTEND_URL,
        path: "/home",
      });

      const user = await getUserByEmail(userInfo.email);
      if (user.length) {
        console.info("got the user user");
        console.info({ user });
        const jwtToken = fastify.jwt.sign({ user }, { expiresIn: "7d" });
        // const refreshToken = fastify.jwt.sign({ user }, { expiresIn: "7d" });
        console.info("jwtToken", jwtToken);
        reply.setCookie("session", jwtToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          path: "/",
        });
        // A good way to handle parallel requests where refresh token has revoked
        // https://github.com/oauth2-proxy/oauth2-proxy/issues/1006#issuecomment-769048614
        // .setCookie("refreshToken", refreshToken, {
        // 	httpOnly: true,
        // 	secure: true,
        // 	sameSite: "none",
        // })
        reply.redirect(env.FRONTEND_URL);
      } else {
        const newUser = await addNewUser({
          name: userInfo.name as string,
          email: userInfo.email as string,
          isVerified: userInfo.email_verified as boolean,
          profilePicture: userInfo.picture as string,
        });
        console.info("newUser", newUser);
        const jwtToken = fastify.jwt.sign(
          { user: newUser },
          { expiresIn: "7d" }
        );
        console.info("jwtToken", jwtToken);
        reply.setCookie("session", jwtToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        });
        reply.redirect(env.FRONTEND_URL);
      }
    } else {
      reply.redirect("/auth/login/failed");
    }
  });

  fastify.get("/signup", (req, _reply) => {
    req.server.log.debug("/signup");
  });

  done();
};
