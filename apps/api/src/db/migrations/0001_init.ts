import { change } from '../dbScript';

change(async (db) => {
  await db.createTable('user', (t) => ({
    id: t.serial().primaryKey(),
    name: t.string(),
    email: t.string().unique(),
    isVerified: t.name('is_verified').boolean(),
    profilePicture: t.name('profile_picture').string(),
  }));
});
