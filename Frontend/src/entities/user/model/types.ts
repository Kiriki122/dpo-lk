import validator from "validator";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuidv4(),
  firstName: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  lastName: z.string().min(2, "Фамилия должна содержать не менее 2 символов"),
  middleName: z.string().optional(),
  email: z.email({ pattern: z.regexes.email, error: "Некорректый email" }),
  phone: z.string().refine((v) => validator.isMobilePhone(v, "ru-RU"), { message: "invalid" }),
  isPasswordChanged: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
