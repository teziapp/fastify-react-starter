import * as z from "zod";
import { UserSchema } from "./UserType";

export const sessionSchema = z.object({
  user: UserSchema,
  iat: z.number(),
  exp: z.number(),
});

export type SessionType = z.infer<typeof sessionSchema>;
