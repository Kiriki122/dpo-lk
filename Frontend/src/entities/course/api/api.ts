import { privateApi } from "@/shared/api/instance";
import { CourseSchema, type Course } from "../model/types";

export const courseApi = {
  getAll: async () => {
    const response = await privateApi.get<Course[]>("/courses");
    return CourseSchema.array().parse(response.data);
  },
  getById: async (id: number | string): Promise<Course> => {
    const response = await privateApi.get<Course>(`/courses/${id}`);
    return CourseSchema.parse(response.data);
  },
};
