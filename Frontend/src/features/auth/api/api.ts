import { publicApi, privateApi } from "@/shared/api/instance";
import { type LoginResponse, LoginResponseSchema, type RefreshResponse, RefreshResponseSchema } from "../model/types";

const BASE_URL = "/auth";

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await publicApi.post<LoginResponse>(`${BASE_URL}/login`, { email, password });
    return LoginResponseSchema.parse(response.data);
  },
  refresh: async () => {
    const response = await privateApi.get<RefreshResponse>(`${BASE_URL}/refresh`);
    return RefreshResponseSchema.parse(response.data);
  },
  logout: async () => {
    await privateApi.post(`${BASE_URL}/logout`);
  },
};
