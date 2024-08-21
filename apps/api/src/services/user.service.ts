import { db } from "../db/db.config";
import { User } from "../db/tables/user.table";

export const getUserByEmail = async (userEmail: string): Promise<any> => {
  const user = await db.user.where({ email: userEmail });
  return user;
};

export const addNewUser = async (
  userDetails: Omit<User, "id">
): Promise<User> => {
  const newUser = await db.user.create(userDetails);
  return newUser;
};

export const upsertUser = async (userDetails: Omit<User, "id">): Promise<User> => {
  const existingUser = await getUserByEmail(userDetails?.email ?? '');
  if (existingUser[0]?.id) {
    return existingUser[0];
  }
  return addNewUser(userDetails);
};