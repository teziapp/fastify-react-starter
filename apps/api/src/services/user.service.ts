import {db} from "@repo/db";
import { User } from "@repo/db";

export const getUserByEmail = async (userEmail: string): Promise<User> =>{
  const user = await db.user.findByOptional({ email: userEmail });
  // why the fuck it's returning key value pair instead of User type
  // if it return array
  if (Array.isArray(user) && user.length > 0) {
    return user[0] as User;
  }
  return user as User;
};

export const addNewUser = async (
  userDetails: Omit<User, "id">
): Promise<User> => {
  const newUser = await db.user.create(userDetails);
  return newUser as User;
};

export const upsertUser = async (userDetails: Omit<User, "id">): Promise<User> => {
  const existingUser = await getUserByEmail(userDetails?.email ?? '');
  if (existingUser?.id) {
    return existingUser;
  }
  return addNewUser(userDetails);
};