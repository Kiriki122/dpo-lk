import { useState, useEffect } from "react";

import { mockCourses } from "../lib/mock";

import type { Course } from "../model/types";

const FETCH_DELAY = 500; // Имитация задержки сети

interface FetchResult {
  data: Course[];
  isLoading: boolean;
  error: string | null;
}

export const useFetchCourses = (): FetchResult => {
  const [data, setData] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    // Имитация асинхронного запроса
    const timer = setTimeout(() => {
      try {
        // В реальном приложении здесь был бы вызов fetch/axios
        setData(mockCourses);
        setError(null);
      } catch (err) {
        console.log(err);

        setError("Не удалось загрузить данные о курсах.");
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }, FETCH_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading, error };
};
