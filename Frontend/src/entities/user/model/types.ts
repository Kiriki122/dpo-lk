import validator from "validator";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  lastName: z.string().min(2, "Фамилия должна содержать не менее 2 символов"),
  middleName: z.string().optional(),
  email: z.string().email({ pattern: z.regexes.email, error: "Некоректый email" }),
  phone: z.string().refine((v) => validator.isMobilePhone(v, "ru-RU"), { message: "invalid" }),
});

export type User = z.infer<typeof UserSchema>;
