import { privateApi } from "@/shared/api/instance";

import type { UserDataForm } from "../model/schema";

export const updateUserData = async (data: UserDataForm) => {
  const response = await privateApi.patch("/users/me", data);

  return response.data;
};
