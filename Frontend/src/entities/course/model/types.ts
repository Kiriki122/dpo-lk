import { z } from "zod";

export const CourseModuleSchema = z.object({
  title: z.string(),
  hours: z.number(),
});

export const CourseSchema = z.object({
  id: z.number(),
  name: z.string(),
  hours: z.number(),
  description: z.string().nullable().optional(),

  mode: z.string().nullable().optional(),
  category: z.string().nullable().optional(),
  duration: z.string().nullable().optional(),

  modules: z.array(CourseModuleSchema).default([]),
});

export type Course = z.infer<typeof CourseSchema>;
