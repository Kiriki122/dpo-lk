export interface CourseModule {
  id: number;
  title: string;
  totalHours: number;
  lectureHours: number;
  practiceHours: number;
  selfStudyHours: number;
}

// Comment: будет ли статус "недоступен" и "в обработке"?
export type CourseStatus = "enrolled" | "available";

export interface Course {
  id: number;
  title: string;
  durationHours: number;
  format: "Онлайн" | "Офлайн" | "Смешанный";
  description: string;
  modules: CourseModule[];
  status: CourseStatus;
}
