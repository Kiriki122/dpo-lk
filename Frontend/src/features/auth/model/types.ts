import { z } from "zod";

import { UserSchema } from "@/entities/user";

export const LoginResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const RefreshResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;

export const loginFormSchema = z.object({
  login: z.string().min(1, { message: "Это поле обязательно к заполнению" }).email({
    message: "Введите корректный email",
  }),
  password: z.string().min(1, { message: "Это поле обязательно к заполнению" }),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;

export type LoginMutationVariables = {
  credentials: LoginFormData;
  fromPage: string | undefined;
};
