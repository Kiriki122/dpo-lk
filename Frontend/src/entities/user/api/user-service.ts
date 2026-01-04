import { privateApi, publicApi } from "@/shared/api/instance";
import { RefreshResponseSchema, type RefreshResponse } from "@/shared/api/types";
import { LoginResponseSchema, type LoginResponse } from "./types";

export const loginUserByEmail = async (email: string, password: string) => {
  const response = await publicApi.post<LoginResponse>("/login", { email, password });

  return LoginResponseSchema.parse(response.data);
};

export const checkAuthUser = async () => {
  const response = await publicApi.get<RefreshResponse>("/refresh");
  return RefreshResponseSchema.parse(response.data);
};

export const logoutUser = async () => {
  await privateApi.post("/logout");
  localStorage.removeItem("accessToken");
};
