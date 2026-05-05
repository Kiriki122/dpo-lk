import { UserSchema, userStore, type User } from "@/entities/user";
import { privateApi } from "@/shared/api/instance";

export const userApi = {
  getUser: async () => {
    const response = await privateApi.get<User>("/users/me");
    const user = UserSchema.parse(response.data);
    userStore.setUser(user);
    return user;
  },
};
