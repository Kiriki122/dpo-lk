const { z } = require("zod");

const passportGroupSchema = z.object({
  passportSeries: z.string("Серия паспорта обязательна при заполнении").min(1, "Серия паспорта обязательна при заполнении"),
  passportNumber: z.string("Номер паспорта обязателен при заполнении").min(1, "Номер паспорта обязателен при заполнении"),
  passportIssuedBy: z.string("Кем выдан обязателен при заполнении").min(1, "Кем выдан обязателен при заполнении"),
  passportDivisionCode: z.string("Код подразделения обязателен при заполнении").min(1, "Код подразделения обязателен при заполнении"),
  passportIssueDate: z.string("Дата выдачи должна быть в формате ГГГГ-ММ-ДД").regex(/^\d{4}-\d{2}-\d{2}$/, "Дата выдачи должна быть в формате ГГГГ-ММ-ДД"),
});
const updateFaceSchema = z.object({
  body: z.object(
    {
      email: z.string().email("Некорректный email").nonempty(),
      birthDate: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, "Дата рождения должна быть в формате ГГГГ-ММ-ДД")
        .optional(),
      snils: z
        .string()
        .regex(/^\d{11}$/, "СНИЛС должен содержать 11 цифр")
        .optional(),
      passport: passportGroupSchema.optional().nullable(),
      registrationAddress: z.string().min(1, "Адрес регистрации не может быть пустой строкой").optional(),
    },
    { error: "Ожидается json объект в теле запроса" }
  ),
});

module.exports = { updateFaceSchema };
