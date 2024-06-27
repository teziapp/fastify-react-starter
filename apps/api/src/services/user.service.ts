import { db } from "../db/db.config";
import { User } from "../db/tables/user.table";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getUserByEmail = async (userEmail: string): Promise<any> => {
  const user = await db.user.where({ email: userEmail });
  return user;
};

export const addNewUser = async (
  userDetails: Omit<User, "id">,
): Promise<User> => {
  const newUser = await db.user.selectAll().create(userDetails);
  return newUser;
};
