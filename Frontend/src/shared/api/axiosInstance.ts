import axios from "axios";

import { authRequestInterceptor, errorResponseInterceptor, successResponseInterceptor } from "./interceptors";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(authRequestInterceptor);

axiosInstance.interceptors.response.use(successResponseInterceptor, errorResponseInterceptor);
