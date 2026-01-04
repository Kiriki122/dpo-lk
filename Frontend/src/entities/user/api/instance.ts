import axios, { AxiosError } from "axios";

import { axiosInstance } from "@/shared/api/axiosInstance";
import type { RefreshResponse } from "./types";
import { logoutUser } from "./userApi";

const $userApi = axios.create(axiosInstance.defaults);

$userApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
  return config;
});

$userApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axiosInstance.get<RefreshResponse>("/refresh");
        localStorage.setItem("accessToken", response.data.accessToken);
        $userApi.request(originalRequest);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("API Error: ", axiosError.message || axiosError.response?.statusText);
        logoutUser();
      }
    }

    throw error;
  }
);

export { $userApi };
