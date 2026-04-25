import { z } from "zod";

export const ApplicationSchema = z.object({
  id: z.uuid(),
  date: z.coerce.date().transform((str) => new Date(str)),
  courseName: z.string().min(1, "Название курса не может быть пустым"),
  status: z.string(),
  number: z.string(),
});

export type Application = z.infer<typeof ApplicationSchema>;
