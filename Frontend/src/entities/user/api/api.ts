import { privateApi, publicApi } from "@/shared/api/instance";
import { LoginResponseSchema, RefreshResponseSchema, type LoginResponse, type RefreshResponse } from "./types";

const BASE_URL = "/users";

const login = async (email: string, password: string) => {
  const response = await publicApi.post<LoginResponse>(`${BASE_URL}/login`, { email, password });

  return LoginResponseSchema.parse(response.data);
};

const checkAuth = async () => {
  const response = await publicApi.get<RefreshResponse>(`${BASE_URL}/refresh`);
  return RefreshResponseSchema.parse(response.data);
};

const logout = async () => {
  await privateApi.post(`${BASE_URL}/logout`);
  localStorage.removeItem("accessToken");
};

export const userApi = {
  login,
  checkAuth,
  logout,
};
