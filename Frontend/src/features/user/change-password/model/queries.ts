import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ZodError } from "zod";

import { userStore } from "@/entities/user";
import { sessionStore } from "@/shared/session";
import { changePassword as changePasswordApi } from "../api/api";
import type { ChangePasswordResponse, ChangePasswordSchema } from "./types";

export const useChangePassword = () => {
  const {
    mutate: changePassword,
    isPending,
    isError,
    error,
    isSuccess,
  } = useMutation({
    mutationFn: (data: Omit<ChangePasswordSchema, "confirmPassword">) => changePasswordApi(data),
    onSuccess: (data: ChangePasswordResponse) => {
      sessionStore.setToken(data.accessToken);
      userStore.setUser(data.user);
    },
  });

  const getErrorMessage = (err: Error | null): string | null => {
    if (!err) return null;

    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        return "Неверный текущий или новый пароль";
      }
      if (err.response?.status === 500) {
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

  return { changePassword, isPending, error: errorMessage, isError, isSuccess };
};
