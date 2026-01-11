const { z } = require("zod");

const CourseModuleSchema = z.object({
  title: z.string(),
  hours: z.number().or(z.string().transform(Number)),
});

const CourseFrom1CSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  hours: z.number().or(z.string().transform(Number)),
  description: z.string().optional().nullable(),
  goals: z.string().optional().nullable(),
  knowledge: z.string().optional().nullable(),
  mode: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  duration: z.string().optional().nullable(),
  qualification: z.string().optional().nullable(),
  specialty: z.string().optional().nullable(),
  isTrainingProgram: z.boolean(),

  modules: z.array(CourseModuleSchema).optional().default([]),
});

const OneCResponseSchema = z.array(CourseFrom1CSchema);

module.exports = { OneCResponseSchema };
