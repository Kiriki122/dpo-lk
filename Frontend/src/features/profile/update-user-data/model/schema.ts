import { z } from "zod";

const passportGroupSchema = z.object({
  passportSeries: z
    .string()
    .trim()
    .min(4, "Серия паспорта должна состоять из 4 цифр")
    .max(4, "Серия паспорта должна состоять из 4 цифр"),
  passportNumber: z
    .string()
    .trim()
    .min(6, "Номер паспорта должен состоять из 6 цифр")
    .max(6, "Номер паспорта должен состоять из 6 цифр"),
  passportIssuedBy: z.string().trim().min(1, "Кем выдан паспорт").max(100, "Кем выдан паспорт"),
  passportDivisionCode: z.string().trim().min(1, "Код подразделения").max(20, "Код подразделения"),
  passportIssueDate: z
    .string()
    .trim()
    .min(1, "Дата выдачи паспорта")
    .refine((val) => !isNaN(Date.parse(val)), "Неверный формат даты")
    .refine((val) => new Date(val) <= new Date(), "Дата выдачи паспорта не может быть больше текущего года")
    .refine((val) => {
      const date = new Date(val);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 100);
      return date >= minDate;
    }, "Ошибка в дате")
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), "Дата выдачи паспорта должна быть в формате ГГГГ-ММ-ДД"),
});
export const userDataSchema = z.object({
  email: z.string().min(1, "Email обязателен").email("Некорректный email"),

  birthDate: z
    .string()
    .trim()
    .refine((val) => !isNaN(Date.parse(val)), "Неверный формат даты")
    .refine((val) => new Date(val) <= new Date(), "Дата рождения не может быть больше текущего года")
    .refine((val) => {
      const date = new Date(val);
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 100);
      return date >= minDate;
    }, "Ошибка в дате")
    .refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), "Дата рождения должна быть в формате ГГГГ-ММ-ДД"),

  snils: z
    .string()
    .trim()
    .min(1, "СНИЛС обязателен")
    .refine((val) => /^\d{11}$/.test(val), "СНИЛС должен состоять из 11 цифр"),

  passport: passportGroupSchema,

  registrationAddress: z.string().trim().min(1, "Адрес регистрации обязателен"),
});

export type UserDataForm = z.input<typeof userDataSchema>;

export const defaultUserDataValues: UserDataForm = {
  email: "",
  birthDate: "",
  snils: "",
  passport: {
    passportSeries: "",
    passportNumber: "",
    passportIssuedBy: "",
    passportDivisionCode: "",
    passportIssueDate: "",
  },
  registrationAddress: "",
};
