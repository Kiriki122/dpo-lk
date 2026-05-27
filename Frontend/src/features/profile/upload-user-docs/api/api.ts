import { privateApi } from "@/shared/api/instance";
import { type UploadSchema } from "../model/schema";

export const uploadDocumentsApi = async (data: UploadSchema) => {
  const formData = new FormData();

  formData.append("email", data.email);

  const documentTypes: string[] = [];

  data.docs.forEach((doc: { file: File; type: string }) => {
    formData.append("files", doc.file); 
    documentTypes.push(doc.type);
  });

  formData.append("documentTypes", JSON.stringify(documentTypes));

  const response = await privateApi.post("/users/me/docs", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
