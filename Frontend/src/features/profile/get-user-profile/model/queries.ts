import { useQuery } from "@tanstack/react-query";

import { userApi, userQueryKey } from "@/entities/user";

export const useUserProfile = () => {
  return useQuery({
    queryKey: userQueryKey,
    queryFn: userApi.getUser,
  });
};
