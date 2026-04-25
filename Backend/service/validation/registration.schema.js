const { z } = require("zod");
const validator = require("validator");

const RegistrationSchema = z.object({
  body: z.object(
    {
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
      phone: z.preprocess(
        (val) => {
          if (typeof val !== "string") return val;
          const cleaned = val.replace(/\D/g, "");
          return cleaned.startsWith("8") ? cleaned : "+" + cleaned;
        },
        z.string().refine((value) => validator.isMobilePhone(value, "ru-RU"), {
          message: "Неверный формат мобильного телефона",
        })
      ),
      password: z
        .string()
        .min(8, "Пароль должен содержать минимум 8 символов")
        .max(32, "Пароль должен содержать максимум 32 символа")
        .regex(
          /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{}|:,.?/]+$/,
          "Разрешены латинские буквы, цифры и символы: ! @ # $ % ^ & * ( ) _ + - = [ ] { } | : , . ? /"
        ),
    },
    { error: "Ожидается json объект в теле запроса" }
  ),
});

module.exports = { RegistrationSchema };
