import axios, { AxiosError, type CreateAxiosDefaults } from "axios";

import { API_URL } from "../config/env";
import type { RefreshResponse } from "./types";

const axiosOptions: CreateAxiosDefaults = {
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const publicApi = axios.create(axiosOptions);

export const privateApi = axios.create(axiosOptions);

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await publicApi.get<RefreshResponse>("/refresh");
        localStorage.setItem("accessToken", response.data.accessToken);
        return privateApi.request(originalRequest);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("API Error: ", axiosError.message || axiosError.response?.statusText);
      }
    }

    throw error;
  }
);
