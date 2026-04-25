import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { getApplicationDocumentsApi as api } from "../api/api";

export const useApplicationDocumentsLinks = (DocNumber: string) => {
  const {
    mutate: download,
    error,
    isPending,
    ...others
  } = useMutation({
    mutationFn: () => api.getApplicationDocuments(DocNumber),
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          error.message = "Документ еще не создан. Попробуйте повторить попытку позже.";
          return;
        }
        if (error.response && error.response?.status >= 500) {
          error.message = "Сервер не доступен. Попробуйте повторить попытку позже.";
        }
      }
      error.message = "Ошибка при скачивании файла";
      return error;
    },
  });

  return {
    download,
    error,
    isPending,
    ...others,
  };
};
