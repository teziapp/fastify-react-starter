import { environments } from "@repo/utils";
import "dotenv/config";
import { z } from "zod";

const envDefaultFields = z
  .object({
    VITE_BE_URL: z.string().url(),
    DB_URL: z.string().url(),
    DB_TEST_URL: z.string().url().optional(),
    ENVIRONMENT: z.enum(environments),
    FRONTEND_URL: z.string().url(),
    JWT_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
  })
  .refine((env) => {
    if (env.ENVIRONMENT !== "prod" && env.DB_TEST_URL) {
      return {
        path: "DB_TEST_URL",
        message: "DB_TEST_URL is not allowed in production",
      };
    }
    return true;
  });

const envDevFields = z.object({
  ENVIRONMENT: z.literal("dev"),
});

const envProdFields = z.object({
  ENVIRONMENT: z.literal("prod"),
  // DISCORD_WEBHOOK_URL: z.string().url(),
});

const envTestFields = z.object({
  ENVIRONMENT: z.literal("test"),
});

const conditionalEnvSchema = z.discriminatedUnion("ENVIRONMENT", [
  envDevFields,
  envProdFields,
  envTestFields,
]);

const envProdSchema = z.intersection(envDefaultFields, envProdFields);
export type EnvProd = z.infer<typeof envProdSchema>;

export const envSchema = z.intersection(envDefaultFields, conditionalEnvSchema);
export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;

export const isProd = env.ENVIRONMENT === "prod";
export const isDev = env.ENVIRONMENT === "dev";
export const isTest = env.ENVIRONMENT === "test";
