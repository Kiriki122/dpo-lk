import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ZodError } from "zod";

import { submitApplication as submitApplicationApi } from "../api/submitApplication";
import type { ApplicationResponse, RegistrationFormData } from "./schema";

export const useSubmitApplication = (onSuccessCallback?: () => void) => {
  const {
    mutateAsync: submitApplication, // Экспортируем mutateAsync для удобной работы с react-hook-form
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data: RegistrationFormData) => submitApplicationApi(data),
    onSuccess: (_data: ApplicationResponse) => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
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

  return {
    submitApplication,
    isPending,
    error: errorMessage,
    isError,
    isSuccess,
  };
};
