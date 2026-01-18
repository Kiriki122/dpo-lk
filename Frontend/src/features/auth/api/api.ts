import { publicApi, privateApi } from "@/shared/api/instance";
import { AuthResponseSchema, type AuthResponse } from "../model/types";

const BASE_URL = "/auth";

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await publicApi.post<AuthResponse>(`${BASE_URL}/login`, { email, password });
    return AuthResponseSchema.parse(response.data);
  },
  refresh: async () => {
    const response = await publicApi.get<AuthResponse>(`${BASE_URL}/refresh`);
    return AuthResponseSchema.parse(response.data);
  },
  logout: async () => {
    await privateApi.post(`${BASE_URL}/logout`);
  },
};
