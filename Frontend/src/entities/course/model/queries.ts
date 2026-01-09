import { useQuery } from "@tanstack/react-query";

import { courseApi } from "../api/api";

export const courseKeys = {
  root: ["courses"] as const,
  all: () => [...courseKeys.root, "all"] as const,
  detail: (id: number | string) => [...courseKeys.root, "detail", id] as const,
};

export const useCoursesQuery = () => {
  return useQuery({
    queryKey: courseKeys.all(),
    queryFn: () => courseApi.getAll(),
  });
};

export const useCourseDetailQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: courseKeys.detail(id!),
    queryFn: () => courseApi.getById(id!),
    enabled: !!id,
  });
};
