import { z } from "zod";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/jpg"];

export const uploadSchema = z.object({
  email: z.string().min(1, "email обязателен").email("Некорректный email"),
  files: z
    .array(z.instanceof(File))
    .min(1, "Должен быть загружен хотя бы один файл")
    .refine(
      (files) => files.every((file) => ACCEPTED_TYPES.includes(file.type)),
      "Допустимый формат файлов только PDF и JPG"
    ),
});

export type UploadSchema = z.infer<typeof uploadSchema>;
