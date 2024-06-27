import { fastifyCors } from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { app } from "./app";
import { env } from "./configs/env.config";

export const server = app;

const port = Number(process.env.PORT) || 3000;

// TODO: Figure out how to get secure-session https://www.npmjs.com/package/@fastify/secure-session
server.register(fastifyCors, {
  origin: [env.FRONTEND_URL],
  credentials: true,
});

server.register(helmet);

server.register(sensible);

// Run the server!
server.listen({ port: port, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  server.log.info(`Server is now listening on ${address}`);
});

const unexpectedErrorHandler = (error: unknown) => {
  console.error(error);
  server.close();
  process.exit(1);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
