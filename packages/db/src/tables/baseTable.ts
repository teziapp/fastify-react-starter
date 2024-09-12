import { createBaseTable } from "orchid-orm";
import { zodSchemaConfig } from "orchid-orm-schema-to-zod";

export const BaseTable = createBaseTable({
  schemaConfig: zodSchemaConfig,
  snakeCase: true,
  columnTypes: (t) => ({
    ...t,
    autoId: () => t.serial().primaryKey(),
    createdAt: t.timestamps().createdAt,
    updatedAt: t.timestamps().updatedAt,
  }),
});

// to use later for custom raw SQL expressions
export const { sql } = BaseTable;
