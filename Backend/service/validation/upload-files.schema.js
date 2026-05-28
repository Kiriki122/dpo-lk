const { z } = require("zod");

const UploadFilesSchema = z.object({
  DocNumber: z
    .string("Номер документа обязателен. DocNumber: string")
    .min(1, "Номер документа должен содержать минимум 1 символ"),
  Files: z
    .array(
      z.object(
        {
          FileName: z.string().min(1, "FileName не должно быть пустым"),
          Extension: z.string().min(1, "Extension не должно быть пустым"),
          Base64Data: z.base64("Данные должны быть в формате base64").min(1, "Base64Data не должно быть пустым"),
        },
        "Ожидается json объект c описанием файла. Поля: FileName, Extension, Base64Data"
      ),
      "Должен быть загружен хотя бы один файл"
    )
    .min(1, "Должен быть загружен хотя бы один файл"),
});

const UploadFaceFilesSchema = z.object({
  email: z.string().email("Некорректный email").nonempty("email обязателен"),
  Files: z
    .array(
      z.object(
        {
          FileName: z.string().min(1, "FileName не должно быть пустым"),
          Extension: z.string().min(1, "Extension не должно быть пустым"),
          Base64Data: z.base64("Данные должны быть в формате base64").min(1, "Base64Data не должно быть пустым"),
          DocumentType: z.enum([
            "ДокументУдостоверяющийЛичность",
            "СНИЛС",
            "ДокументОПолученномОбразовании",
            "ОбработкаПД",
          ]),
        },
        "Ожидается json объект c описанием файла. Поля: FileName, Extension, Base64Data"
      ),
      "Должен быть загружен хотя бы один файл"
    )
    .min(1, "Должен быть загружен хотя бы один файл"),
});

module.exports = { UploadFilesSchema, UploadFaceFilesSchema };
