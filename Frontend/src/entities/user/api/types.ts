import z from "zod";

import { UserSchema } from "@/shared/types/user";

export const LoginResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
