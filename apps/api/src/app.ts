import cookiePlugin from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import oauthPlugin from "@fastify/oauth2";
import {
  FastifyTRPCPluginOptions,
  fastifyTRPCPlugin,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { authRouter } from "./auth.router";
import { env } from "./configs/env.config";
import { logsConfig } from "./configs/logger.config";
import { trpcContext } from "./context.trpc";
import { ApiRouter, trpcRouter } from "./router.trpc";

export const app = fastify({
  logger: logsConfig[env.ENVIRONMENT],
  // maxParamLength: 5000,
});

// Declare a route
app.get("/", function (_, reply) {
  reply.send("Hello World!");
});

// Fastify level centralized error handling
app.setErrorHandler(function (error, _request, reply) {
  if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    // Log error
    this.log.error(error);
    // Send error response
    reply.status(500).send({ ok: false });
  } else {
    // fastify will use parent error handler to handle this
    reply.send(error);
  }
});

app.register(cookiePlugin);
app.register(fastifyJwt, { secret: env.JWT_SECRET });
app.register(oauthPlugin, {
  name: "googleOAuth2",
  scope: ["profile", "email"],
  cookie: {
    secure: true,
  },
  credentials: {
    auth: oauthPlugin.GOOGLE_CONFIGURATION,
    client: {
      id: env.GOOGLE_CLIENT_ID,
      secret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  startRedirectPath: "/auth/google",
  callbackUri: env.VITE_BE_URL + "/auth/google/callback",
});

app.register(authRouter, { prefix: "/auth" });

app.register(fastifyTRPCPlugin, {
  prefix: "/v1",
  trpcOptions: {
    router: trpcRouter,
    createContext: trpcContext,
    // TRPC level centralized error handling
    onError({ path, error }) {
      // report to error monitoring
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<ApiRouter>["trpcOptions"],
});
