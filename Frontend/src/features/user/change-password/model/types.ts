import { z } from "zod";

import { UserSchema } from "@/entities/user";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().nonempty("Текущий пароль обязателен"),
    newPassword: z
      .string()
      .min(8, "Новый пароль должен быть не менее 8 символов")
      .max(32, "Пароль не может быть длиннее 32 символов")
      .regex(
        /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{}|:,.?/]+$/,
        "Разрешены латинские буквы, цифры и символы: ! @ # $ % ^ & * ( ) _ + - = [ ] { } | : , . ? /"
      ),
    confirmPassword: z.string().nonempty("Подтверждение пароля обязательно"),
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Новый пароль должен отличаться от старого",
    path: ["newPassword"],
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;

export const changePasswordResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

export type ChangePasswordResponse = z.infer<typeof changePasswordResponseSchema>;
