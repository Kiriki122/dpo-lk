import z from "zod";

import { UserSchema } from "../types/user";

export const RefreshResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
