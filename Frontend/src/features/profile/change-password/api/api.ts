import { privateApi } from "@/shared/api/instance";

import type { ChangePasswordSchema } from "../model/types";

type ChangePasswordRequest = Omit<ChangePasswordSchema, "confirmPassword">;

export const changePassword = (data: ChangePasswordRequest) => {
  return privateApi.patch("/users/change-password", data);
};
