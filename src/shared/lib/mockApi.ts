import { type ProgramWithDocuments } from "../types/document";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_DATA: ProgramWithDocuments[] = [
  {
    id: 101,
    title: "Основы TypeScript и React",
    documents: [
      {
        id: 1,
        name: "Сертификат об окончании",
        downloadUrl: "#download_react_cert_1",
      },
      {
        id: 3,
        name: "Сертификат об окончании",
        downloadUrl: "#download_react_cert_3",
      },
    ],
  },
  {
    id: 102,
    title: "Продвинутый FSD и Clean Architecture",
    documents: [
      {
        id: 2,
        name: "Сертификат об окончании",
        downloadUrl: "#download_fsd_cert_2",
      },
    ],
  },
  {
    id: 103,
    title: "Введение в Serverless",
    documents: [],
  },
];

/**
 * Имитирует асинхронную загрузку программ пользователя с документами.
 * @param forceError - Если true, имитирует ошибку.
 * @param forceEmpty - Если true, возвращает пустой массив.
 */
export const fetchUserProgramsWithDocuments = async (
  forceError: boolean = false,
  forceEmpty: boolean = false
): Promise<ProgramWithDocuments[]> => {
  console.log("Fetching documents...");
  await delay(2000); // Имитация задержки 2 секунды

  if (forceError) {
    throw new Error("Не удалось загрузить данные о документах. Попробуйте позже.");
  }

  return forceEmpty ? [] : MOCK_DATA;
};
