import z from "zod";

import { UserSchema } from "../model/schema";

export const LoginResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const RefreshResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
