const { z } = require("zod");

const UploadRequestSchema = z.object({
  body: z.object(
    {
      DocNumber: z
        .string("Номер документа обязателен. DocNumber: string")
        .min(1, "Номер документа должен содержать минимум 1 символ"),
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

module.exports = { UploadRequestSchema };
