import { useMutation, useQueryClient } from "@tanstack/react-query";

import { applicationsKeys } from "@/entities/application";
import { uploadDocumentsApi } from "../api/api";
import { type UploadSchema } from "./schema";

export const useUploadMutation = (DocNumber: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UploadSchema) => uploadDocumentsApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: applicationsKeys.detail(DocNumber) });
    },
  });
};
