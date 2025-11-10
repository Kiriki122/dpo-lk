import type { Course } from "../model/types";

export const mockCourses: Course[] = [
  {
    id: 1,
    title: "Основы React и TypeScript",
    durationHours: 80,
    format: "Онлайн",
    description:
      "Глубокое погружение в современную разработку на React с использованием строго типизированного TypeScript.",
    modules: [
      { id: 101, title: "Введение в TS", totalHours: 20, lectureHours: 8, practiceHours: 10, selfStudyHours: 2 },
      { id: 102, title: "Хуки и Состояние", totalHours: 30, lectureHours: 10, practiceHours: 15, selfStudyHours: 5 },
      {
        id: 103,
        title: "Роутинг и Архитектура",
        totalHours: 30,
        lectureHours: 10,
        practiceHours: 10,
        selfStudyHours: 10,
      },
    ],
    status: "enrolled", // Мой курс
  },
  {
    id: 2,
    title: "FSD: Архитектура сложных приложений",
    durationHours: 60,
    format: "Смешанный",
    description: "Изучение принципов Feature-Sliced Design для масштабируемых проектов.",
    modules: [
      { id: 201, title: "Слои и Слайсы", totalHours: 15, lectureHours: 5, practiceHours: 5, selfStudyHours: 5 },
      {
        id: 202,
        title: "Взаимодействие между слоями",
        totalHours: 25,
        lectureHours: 10,
        practiceHours: 10,
        selfStudyHours: 5,
      },
      {
        id: 203,
        title: "Навигация и Публичный API",
        totalHours: 20,
        lectureHours: 5,
        practiceHours: 10,
        selfStudyHours: 5,
      },
    ],
    status: "enrolled", // Мой курс
  },
  {
    id: 3,
    title: "Продвинутый Backend на Node.js",
    durationHours: 120,
    format: "Офлайн",
    description: "Мастер-класс по созданию высоконагруженных API с использованием Express и PostgreSQL.",
    modules: [
      { id: 301, title: "Основы Express", totalHours: 40, lectureHours: 15, practiceHours: 20, selfStudyHours: 5 },
      { id: 302, title: "Базы данных и ORM", totalHours: 40, lectureHours: 15, practiceHours: 20, selfStudyHours: 5 },
      {
        id: 303,
        title: "Аутентификация и Безопасность",
        totalHours: 40,
        lectureHours: 10,
        practiceHours: 20,
        selfStudyHours: 10,
      },
    ],
    status: "available", // Доступный курс
  },
  {
    id: 4,
    title: "Основы UX/UI дизайна",
    durationHours: 45,
    format: "Онлайн",
    description: "Быстрый старт в мире дизайна пользовательских интерфейсов.",
    modules: [
      { id: 401, title: "Принципы дизайна", totalHours: 15, lectureHours: 5, practiceHours: 7, selfStudyHours: 3 },
      { id: 402, title: "Работа в Figma", totalHours: 30, lectureHours: 10, practiceHours: 15, selfStudyHours: 5 },
    ],
    status: "available", // Доступный курс
  },
];
