import { axiosInstance } from "@/shared/api/axiosInstance";
import { LoginResponseSchema, type LoginResponse } from "./types";

export const loginUserByEmail = async (data: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/login", data);

  return LoginResponseSchema.parse(response.data);
};

export const logoutUser = async () => {
  await axiosInstance.post("/logout");
  localStorage.removeItem("accessToken");
};
