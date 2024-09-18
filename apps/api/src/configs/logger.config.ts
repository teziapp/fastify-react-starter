import { Environment } from "@repo/utils";
import { FastifyBaseLogger, FastifyHttpOptions } from "fastify";
import { Server } from "https";
import { env } from "./env.config";

export const logsConfig: Record<
	Environment,
	FastifyHttpOptions<Server, FastifyBaseLogger>["logger"]
> = {
	dev: {
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
				// if axiom is enabled, we will send the logs to axiom
				...(env.AXIOM_DATASET && env.AXIOM_TOKEN
					? { dataset: env.AXIOM_DATASET, token: env.AXIOM_TOKEN }
					: {}),
			},
		},
	},
	prod: true,
	staging: true,
	test: false,
};
