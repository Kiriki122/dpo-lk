import { privateApi } from "@/shared/api/instance";
import { type UploadSchema } from "../model/schema";

export const uploadDocumentsApi = async (data: UploadSchema) => {
  const formData = new FormData();

  formData.append("email", data.email);

  Array.from(data.files).forEach((file) => {
    formData.append("files", file);
  });

  const response = await privateApi.post("/users/me/docs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
