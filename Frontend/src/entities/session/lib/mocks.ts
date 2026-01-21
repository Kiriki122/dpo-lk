import { type Course } from "@/entities/course";
import { type Session } from "../model/types";

const reactCourse: Course = {
  id: "941e27d5-f1fd-4525-b5a1-b773739fc2dd",
  name: "React Advanced",
  hours: 40,
  description: "Углубленное изучение",
  modules: [],
};

const designCourse: Course = {
  id: "9ac7f2c1-9c9f-4a89-b460-33c316541e82",
  name: "UI/UX Design",
  hours: 20,
  description: "Основы дизайна",
  modules: [],
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
