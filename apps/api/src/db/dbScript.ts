import { rakeDb } from "orchid-orm/migrations";
import { env } from "../configs/env.config";
import { BaseTable } from "./tables/baseTable";

const allDatabases = [
  {
    // biome-ignore lint/style/useNamingConvention: <as needed by library>
    databaseURL: env.DB_URL,
  },
];
if (env.ENVIRONMENT === "test" && env.DB_TEST_URL) {
  // biome-ignore lint/style/useNamingConvention: <as needed by library>
  allDatabases.push({ databaseURL: env.DB_TEST_URL });
}

export const change = rakeDb(allDatabases, {
  baseTable: BaseTable,
  dbPath: "./db.config",
  migrationId: "serial",
  migrationsPath: "./migrations",
  // commands: {
  // 	async seed() {
  // 		await seed();
  // 	},
  // },
  import: (path) => import(path),
});
