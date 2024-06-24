import { Environment } from "@repo/utils";
import { FastifyBaseLogger, FastifyHttpOptions } from "fastify";
import { Server } from "https";

export const logsConfig: Record<
	Environment,
	FastifyHttpOptions<Server, FastifyBaseLogger>["logger"]
> = {
	dev: true,
	// {
	// 	transport: {
	// 		target: "pino-pretty",
	// 		options: {
	// 			translateTime: "HH:MM:ss Z",
	// 			ignore: "pid,hostname",
	// 		},
	// 	},
	// },
	prod: true,
	staging: true,
	test: false,
};
