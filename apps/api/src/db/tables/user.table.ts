import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";

export class UserTable extends BaseTable {
  readonly table = "user";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    name: t.string().trim().nullable(),
    email: t.string().trim().unique().nullable(),
    isVerified: t.boolean().default(false),
    profilePicture: t.string().nullable(),
    lastLoginAt: t.timestamp().nullable(),
    createdAt: t.timestamps().createdAt.nullable(),
    updatedAt: t.timestamps().updatedAt.nullable(),
  }));
}

export type User = Selectable<UserTable>;
export type UserUpdate = Updatable<UserTable>;
export type UserForQuery = Queryable<UserTable>;