import { privateApi, publicApi } from "@/shared/api/instance";
import { RefreshResponseSchema, type RefreshResponse } from "@/shared/api/types";
import { LoginResponseSchema, type LoginResponse } from "./types";

const login = async (email: string, password: string) => {
  const response = await publicApi.post<LoginResponse>("/login", { email, password });

  return LoginResponseSchema.parse(response.data);
};

const checkAuth = async () => {
  const response = await publicApi.get<RefreshResponse>("/refresh");
  return RefreshResponseSchema.parse(response.data);
};

const logout = async () => {
  await privateApi.post("/logout");
  localStorage.removeItem("accessToken");
};

export const userApi = {
  login,
  checkAuth,
  logout,
};
