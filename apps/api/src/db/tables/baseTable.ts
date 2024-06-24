import { createBaseTable } from "orchid-orm";
import { zodSchemaConfig } from "orchid-orm-schema-to-zod";

export const BaseTable = createBaseTable({
  schemaConfig: zodSchemaConfig,
  snakeCase: true,
  columnTypes: (t) => ({
    ...t,
    autoId: () => t.identity().primaryKey(),
    text: () => t.text(0, Infinity),
    createdAt: t.timestamps().createdAt,
    updatedAt: t.timestamps().updatedAt,
  }),
});

// to use later for custom raw SQL expressions
export const { sql } = BaseTable;
