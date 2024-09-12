import { Environment } from "@repo/utils";
import { FastifyBaseLogger, FastifyHttpOptions } from "fastify";
import { Server } from "https";
import { env } from "./env.config";

export const logsConfig: Record<
	Environment,
	FastifyHttpOptions<Server, FastifyBaseLogger>["logger"]
> = {
	dev: {
		level: "trace",
		transport: {
			targets: [
				{
					target: "pino-pretty",
					options: {
						translateTime: "HH:MM:ss Z",
						ignore: "pid,hostname",
					},
				},
			],
		},
	},
	prod: {
		// The minimum level to log: Pino will not log messages with a lower level. Debug and trace logs are only valid for development, and not needed in production.
		// One of 'fatal', 'error', 'warn', 'info', 'debug', 'trace' or 'silent'.
		level: "info",
		transport: {
			targets: [
				{
					target: "@axiomhq/pino",
					options: {
						translateTime: "HH:MM:ss Z",
						ignore: "pid,hostname",
						// if axiom is enabled, we will send the logs to axiom
						...(env.AXIOM_DATASET && env.AXIOM_TOKEN
							? { dataset: env.AXIOM_DATASET, token: env.AXIOM_TOKEN }
							: {}),
					},
				},
			],
		},
	},
	staging: true,
	test: false,
};
