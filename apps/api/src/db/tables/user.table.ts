import { Queryable, Selectable, Updatable } from "orchid-orm";
import { BaseTable } from "./baseTable";

export class UserTable extends BaseTable {
  readonly table = "user";
  columns = this.setColumns((t) => ({
    id: t.autoId(),
    name: t.string().trim(),
    email: t.string().trim().unique(),
    isVerified: t.boolean(),
    profilePicture: t.string(),
  }));
}
export type User = Selectable<UserTable>;
export type UserUpdate = Updatable<UserTable>;
export type UserForQuery = Queryable<UserTable>;
