import { z } from "zod";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/jpg"];

export const uploadSchema = z.object({
  DocNumber: z.string().min(1, "Номер документа должен содержать минимум 1 символ"),
  files: z
    .array(z.instanceof(File))
    .min(1, "Должен быть загружен хотя бы один файл")
    .refine(
      (files) => files.every((file) => ACCEPTED_TYPES.includes(file.type)),
      "Допустимый формат файлов только PDF и JPG"
    ),
});

export type UploadSchema = z.infer<typeof uploadSchema>;
