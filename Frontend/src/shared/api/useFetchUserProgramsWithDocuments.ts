import { useEffect, useState } from "react";

import { MockDocs } from "../lib/documents/mockDocs";

import type { ProgramWithDocuments } from "../types/document";

const FETCH_DELAY = 500; // Имитация задержки сети

interface FetchUserProgramsWithDocumentsResult {
  data: ProgramWithDocuments[];
  isLoading: boolean;
  error: string | null;
}

export const useFetchUserProgramsWithDocuments = (): FetchUserProgramsWithDocumentsResult => {
  const [data, setData] = useState<ProgramWithDocuments[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        // В реальном приложении здесь был бы вызов fetch/axios с параметрами даты
        // Например: `/api/docs?userId=${userId}`

        setData(MockDocs);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить документы.");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }, FETCH_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error };
};
