import { UserSchema, type User } from "@/entities/user";
import { privateApi } from "@/shared/api/instance";

export const profileApi = {
  getProfile: async () => {
    const response = await privateApi.get<User>("/users/me");
    return UserSchema.parse(response.data);
  },
};
