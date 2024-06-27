import * as z from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  isVerified: z.boolean(),
  profilePicture: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
