import { z } from "zod";

import { UserSchema } from "@/entities/user";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Текущий пароль обязателен"),
    newPassword: z.string().min(8, "Новый пароль должен быть не менее 8 символов"),
    confirmPassword: z.string().min(1, "Подтверждение пароля обязательно"),
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
