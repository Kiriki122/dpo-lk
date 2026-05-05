const { z } = require("zod");

const UploadFaceRequestSchema = z.object({
  body: z.object(
    {
      email: z.string("email обязателен").email("Некорректный email").nonempty("email обязателен"),
    },
    { error: "Ожидается json объект в теле запроса" }
  ),
  files: z
    .array(
      z.object({
        originalname: z.string(),
      })
    )
    .min(1, "Должен быть загружен хотя бы один файл"),
});

module.exports = { UploadFaceRequestSchema };
