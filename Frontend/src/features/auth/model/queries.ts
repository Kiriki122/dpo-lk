import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ZodError } from "zod";

import { userStore } from "@/entities/user";
import { sessionStore } from "@/shared/session";
import { authApi } from "../api/api";
import type { AuthResponse, LoginFormData } from "./types";

export const useLogin = () => {
  const {
    mutate: login,
    isPending,
    isError,
    error,
  } = useMutation<AuthResponse, Error, LoginFormData>({
    mutationFn: ({ login, password }) => authApi.login(login, password),

    onSuccess: (data: AuthResponse) => {
      sessionStore.setToken(data.accessToken);
      userStore.setUser(data.user);
    },
  });
  const getErrorMessage = (err: Error | null): string | null => {
    if (!err) return null;

    if (err instanceof AxiosError) {
      if (err.response?.status === 400) {
        return "Неверный логин или пароль";
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

  return { login, isPending, isError, error: errorMessage };
};

export const useInitSession = () => {
  const hasToken = !!sessionStore.getAccessToken();
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(hasToken);

  const { data, isSuccess, isError } = useQuery<AuthResponse>({
    queryKey: ["session"],
    queryFn: authApi.refresh,
    enabled: !hasToken,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isSuccess && data) {
      sessionStore.setToken(data.accessToken);
      userStore.setUser(data.user);
      setIsAuthChecked(true);
    }

    if (isError) {
      sessionStore.clearToken();
      userStore.clearUser();
      setIsAuthChecked(true);
    }
  }, [isSuccess, data, isError]);

  return { isAuthChecked };
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      sessionStore.clearToken();
      userStore.clearUser();
      queryClient.clear();
    },
    onError: () => {
      sessionStore.clearToken();
      userStore.clearUser();
      queryClient.clear();
    },
  });

  return { logout, isPending };
};
