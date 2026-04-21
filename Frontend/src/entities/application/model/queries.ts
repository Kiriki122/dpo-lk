import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ZodError } from "zod";

import { courseApi } from "../api/api";

export const applicationsKeys = {
  root: ["applications"] as const,
  all: () => [...applicationsKeys.root, "all"] as const,
  detail: (id: number | string) => [...applicationsKeys.root, "detail", id] as const,
};

export const useApplicationsQuery = () => {
  const {
    data: applications,
    error,
    isLoading,
    ...others
  } = useQuery({
    queryKey: applicationsKeys.root,
    queryFn: () => courseApi.getUserApplications(),
  });

  const getErrorMessage = (err: Error | null): string | null => {
    if (!err) return null;

    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        return "Проверьте правильность введенных данных";
      }
      if (err.response?.status === 404) {
        return "Выбранный курс не найден";
      }
      if (err.response?.status && err.response.status >= 500) {
        return "Ошибка сервера. Попробуйте зайти позже.";
      }
    }
    if (err instanceof ZodError) {
      console.error("API response validation failed:", err);
      return "Ошибка обработки данных с сервера";
    }
    return "Произошла непредвиденная ошибка";
  };

  const errorMessage = getErrorMessage(error);

  return { applications, error: errorMessage, isLoading, ...others };
};
