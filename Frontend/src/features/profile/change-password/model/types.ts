import { z } from "zod";

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
