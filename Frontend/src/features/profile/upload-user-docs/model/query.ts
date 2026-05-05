import { useMutation } from "@tanstack/react-query";

import { uploadDocumentsApi } from "../api/api";
import { type UploadSchema } from "./schema";

export const useUploadUserDocsMutation = () => {
  return useMutation({
    mutationFn: (data: UploadSchema) => uploadDocumentsApi(data),
  });
};
