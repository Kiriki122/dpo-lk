import { type Course } from "@/entities/course";
import { type Session } from "../model/types";

const reactCourse: Course = {
  id: 1,
  title: "React Advanced",
  durationHours: 40,
  format: "Онлайн",
  description: "Углубленное изучение",
  modules: [],
  status: "enrolled",
};

const designCourse: Course = {
  id: 2,
  title: "UI/UX Design",
  durationHours: 20,
  format: "Офлайн",
  description: "Основы дизайна",
  modules: [],
  status: "enrolled",
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

export const mockSessions: Session[] = [
  {
    id: 101,
    course: reactCourse,
    group: "МДБ-24",
    teacher: "Алексей Смирнов",
    startDateTime: new Date(today.setHours(10, 0)).toISOString(),
    endDateTime: new Date(today.setHours(11, 30)).toISOString(),
  },
  {
    id: 102,
    course: designCourse,
    group: "ИДБ-12",
    teacher: "Мария Иванова",
    startDateTime: new Date(today.setHours(14, 0)).toISOString(),
    endDateTime: new Date(today.setHours(16, 0)).toISOString(),
  },
  {
    id: 103,
    course: reactCourse,
    group: "МВБ-24",
    teacher: "Алексей Смирнов",
    startDateTime: new Date(tomorrow.setHours(10, 0)).toISOString(),
    endDateTime: new Date(tomorrow.setHours(11, 30)).toISOString(),
  },
];
