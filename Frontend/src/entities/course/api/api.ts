import { privateApi } from "@/shared/api/instance";
import { CourseSchema, type Course } from "../model/types";

class CourseApi {
  async getAll() {
    const response = await privateApi.get<Course[]>("/courses");
    return CourseSchema.array().parse(response.data);
  }

  async getById(id: number | string): Promise<Course> {
    const response = await privateApi.get<Course>(`/courses/${id}`);
    return CourseSchema.parse(response.data);
  }
}

export const courseApi = new CourseApi();
