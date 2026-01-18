import { privateApi } from "@/shared/api/instance";
import { changePasswordResponseSchema, type ChangePasswordResponse, type ChangePasswordSchema } from "../model/types";

type ChangePasswordRequest = Omit<ChangePasswordSchema, "confirmPassword">;

export const changePassword = async (data: ChangePasswordRequest) => {
  const response = await privateApi.patch<ChangePasswordResponse>("/users/me/password", data);
  return changePasswordResponseSchema.parse(response.data);
};
