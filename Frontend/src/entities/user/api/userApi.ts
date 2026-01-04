import { axiosInstance } from "@/shared/api/axiosInstance";
import { UserSchema, type User } from "../model/schema";
import { $userApi } from "./instance";
import { LoginResponseSchema, type LoginResponse } from "./types";

export const loginUserByEmail = async (data: { email: string; password: string }): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>("/login", data);

  return LoginResponseSchema.parse(response.data);
};

export const checkAuthUser = async () => {
  try {
    const response = await $userApi.get<{ user: User }>("/check-auth");
    return UserSchema.parse(response.data.user);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const logoutUser = async () => {
  await axiosInstance.post("/logout");
  localStorage.removeItem("accessToken");
};
