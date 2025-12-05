import { type ProgramWithDocuments } from "../../types/document";

export const MockDocs: ProgramWithDocuments[] = [
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
