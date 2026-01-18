import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/entities/user";

export const profileQueryKey = ["profile", "me"];

export const useUserProfile = () => {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: userApi.getProfile,
  });
};
