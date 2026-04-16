import { useQuery } from "@tanstack/react-query";

import { courseApi } from "../api/api";

export const useApplicationsQuery = () => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => courseApi.getUserApplications(),
  });
};
