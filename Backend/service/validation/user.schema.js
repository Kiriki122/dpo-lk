const { z } = require("zod");
const validator = require("validator");

const registrationSchema = z.object({
  body: z.object({
    firstName: z
      .string()
      .min(2, "Имя должно содержать минимум 2 символа")
      .max(32, "Имя должно содержать максимум 32 символa"),
    lastName: z
      .string()
      .min(2, "Фамилия должна содержать минимум 2 символа")
      .max(32, "Фамилия должна содержать максимум 32 символa"),
    middleName: z
      .string()
      .min(2, "Отчество должно содержать минимум 2 символа")
      .max(32, "Отчество должно содержать максимум 32 символa")
      .optional(),
    email: z.email({ message: "Неверный формат email" }),
    phone: z.string().refine((value) => validator.isMobilePhone(value, "ru-RU"), {
      message: "Неверный формат мобильного телефона",
    }),
    password: z
      .string()
      .min(8, "Пароль должен содержать минимум 8 символов")
      .max(32, "Пароль должен содержать максимум 32 символа"),
  }),
});

module.exports = { registrationSchema };
