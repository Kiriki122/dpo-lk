import { privateApi, publicApi } from "@/shared/api/instance";
import { UserSchema, type User } from "../model/types";
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
  privateApi.post(`${BASE_URL}/logout`);
};

const getProfile = async () => {
  const response = await privateApi.get<User>(`${BASE_URL}/me`);

  return UserSchema.parse(response.data);
};

export const userApi = {
  login,
  checkAuth,
  logout,
  getProfile,
};
