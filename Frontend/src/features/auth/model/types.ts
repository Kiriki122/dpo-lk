import { z } from "zod";

import { UserSchema } from "@/entities/user";

export const AuthResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

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
