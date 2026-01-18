import { useQuery } from "@tanstack/react-query";

import { profileApi } from "../api/api";

export const profileQueryKey = ["profile", "me"];

export const useUserProfile = () => {
  return useQuery({
    queryKey: profileQueryKey,
    queryFn: profileApi.getProfile,
  });
};
