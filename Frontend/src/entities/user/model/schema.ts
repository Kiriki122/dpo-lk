import validator from "validator";
import { z } from "zod";

export const UserSchema = z.object({
  id: z.number(),
  // name: z.string().min(2, "Имя должно содержать не менее 2 символов"),
  email: z.string().email({ pattern: z.regexes.email, error: "Некоректый email" }),
  phone: z.string().refine((v) => validator.isMobilePhone(v, "ru-RU"), { message: "invalid" }),
});
