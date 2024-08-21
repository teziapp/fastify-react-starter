import { change } from '../dbScript';

change(async (db) => {
  await db.createTable('user', (t) => ({
    id: t.uuid().primaryKey().default(t.sql`gen_random_uuid()`),
    name: t.string().nullable(),
    email: t.string().nullable().unique(),
    isVerified: t.boolean().default(false),
    profilePicture: t.string().nullable(),
    lastLoginAt: t.timestamp().nullable(),
    createdAt: t.timestamps().createdAt.nullable(),
    updatedAt: t.timestamps().updatedAt.nullable(),
  }));
});
