import validator from "validator";
import { z } from "zod";

export const RegistrationFormSchema = z.object({
  course_uid: z.uuid("Пожалуйста, выберите курс"),
  student_fio: z.string().min(3, "ФИО должно содержать минимум 3 символа"),
  phone: z.string().refine((v) => validator.isMobilePhone(v, "ru-RU"), { message: "Неверный формат номера телефона" }),
  email: z.email({ pattern: z.regexes.email, error: "Некорректый email" }),
});

export type RegistrationFormData = z.infer<typeof RegistrationFormSchema>;

export const applicationResponseSchema = z.object({
  status: z.string().optional(),
});

export type ApplicationResponse = z.infer<typeof applicationResponseSchema>;
