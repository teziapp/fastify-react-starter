import { rakeDb } from "orchid-orm/migrations";
import { env, isTest } from "../configs/env.config";
import { BaseTable } from "./tables/baseTable";
import { seed } from "./seed";

const allDatabases = [
  {
    // biome-ignore lint/style/useNamingConvention: <as needed by library>
    databaseURL: env.DB_URL,
  },
];
if (isTest && env.DB_TEST_URL) {
  // biome-ignore lint/style/useNamingConvention: <as needed by library>
  allDatabases.push({ databaseURL: env.DB_TEST_URL });
}

export const change = rakeDb(allDatabases, {
  baseTable: BaseTable,
  dbPath: "./db.config",
  migrationId: "serial",
  migrationsPath: "./migrations",
  commands: {
  	async seed() {
  		await seed();
  	},
  },
  import: (path) => import(path),
});
