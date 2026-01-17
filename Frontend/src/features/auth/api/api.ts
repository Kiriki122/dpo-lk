import { userStore } from "@/entities/user";
import { publicApi, privateApi } from "@/shared/api/instance";
import { sessionStore } from "@/shared/session";
import { type LoginResponse, LoginResponseSchema, type RefreshResponse, RefreshResponseSchema } from "../model/types";

const BASE_URL = "/auth";

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await publicApi.post<LoginResponse>(`${BASE_URL}/login`, { email, password });
    const data = LoginResponseSchema.parse(response.data);
    sessionStore.setToken(data.accessToken);
    userStore.setUser(data.user);
  },
  refresh: async () => {
    const response = await privateApi.get<RefreshResponse>(`${BASE_URL}/refresh`);
    const data = RefreshResponseSchema.parse(response.data);
    sessionStore.setToken(data.accessToken);
    userStore.setUser(data.user);
  },
  logout: async () => {
    sessionStore.clearToken();
    userStore.clearUser();
    await privateApi.post(`${BASE_URL}/logout`);
  },
};
