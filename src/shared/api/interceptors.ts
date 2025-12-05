import { AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";

// Название ключа в localStorage (должно совпадать с тем, что в user store)
// Если вы используете zustand persist, там данные хранятся в JSON
const TOKEN_KEY = "user-storage";

export const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("authToken");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

export const errorResponseInterceptor = (error: AxiosError) => {
  // Обработка ошибок
  if (error.response) {
    const status = error.response.status;

    if (status === 401) {
      // Здесь мы не можем вызвать store.logout(), так как это нарушит FSD.
      // Варианты решения:
      // 1. Просто очистить localStorage и сделать редирект (жесткий метод)
      // 2. Бросить специфическую ошибку, которую поймает слой выше
      // 3. Dispatch-ить событие window, которое слушает App

      console.warn("Unauthorized! Token might be expired.");
    }
  }

  return Promise.reject(error);
};

export const successResponseInterceptor = (response: AxiosResponse) => {
  // Здесь можно делать маппинг данных если нужно глобально,
  // но лучше просто возвращать ответ
  return response;
};
