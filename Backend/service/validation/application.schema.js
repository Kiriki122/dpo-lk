const { z } = require("zod");
const validator = require("validator");

const ApplicationSchema = z.object({
  body: z.object(
    {
      course_uid: z.uuid(),
      student_fio: z.string().min(3),
      phone: z.string().refine((value) => validator.isMobilePhone(value, "ru-RU"), {
        message: "Неверный формат мобильного телефона",
      }),
      email: z.email({ message: "Неверный формат email" }),
    },
    { error: "Ожидается json объект в теле запроса" }
  ),
});

module.exports = { ApplicationSchema };
