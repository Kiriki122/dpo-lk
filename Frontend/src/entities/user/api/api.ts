import { privateApi } from "@/shared/api/instance";
import { UserSchema, type User } from "../model/types";

const BASE_URL = "/users";

const getProfile = async () => {
  const response = await privateApi.get<User>(`${BASE_URL}/me`);

  return UserSchema.parse(response.data);
};

export const userApi = {
  getProfile,
};
