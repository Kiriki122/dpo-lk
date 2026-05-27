import { z } from "zod";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];

export const uploadSchema = z.object({
  email: z.string().min(1, "email обязателен").email("Некорректный email"),

  docs: z
    .array(
      z.object({
        file: z.instanceof(File),
        type: z.string(),
      })
    )
    .min(1, "Должен быть загружен хотя бы один файл")
    .refine(
      (docs) => docs.every((doc) => ACCEPTED_TYPES.includes(doc.file.type)),
      "Допустимый формат файлов только PDF, JPG и PNG"
    ),
});

export type UploadSchema = z.infer<typeof uploadSchema>;
