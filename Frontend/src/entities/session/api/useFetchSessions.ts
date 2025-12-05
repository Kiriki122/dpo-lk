import { useState, useEffect } from "react";

import { mockSessions } from "../lib/mocks";

import type { Session } from "../model/types";

const FETCH_DELAY = 500; // Имитация задержки сети

interface FetchSessionsResult {
  data: Session[];
  isLoading: boolean;
  error: string | null;
}

export const useFetchSessions = (): FetchSessionsResult => {
  const [data, setData] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    // Имитация асинхронного запроса
    const timer = setTimeout(() => {
      try {
        // В реальном приложении здесь был бы вызов fetch/axios с параметрами даты
        // Например: `/api/sessions?start=${startDate}&end=${endDate}`

        setData(mockSessions);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить расписание.");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }, FETCH_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error };
};
