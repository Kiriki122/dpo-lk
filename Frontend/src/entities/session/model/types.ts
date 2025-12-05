import type { Course } from "@/entities/course";

export interface Session {
  id: number;
  course: Course;
  group: string;
  teacher: string;
  startDateTime: string;
  endDateTime: string;
  classroom?: string;
}
