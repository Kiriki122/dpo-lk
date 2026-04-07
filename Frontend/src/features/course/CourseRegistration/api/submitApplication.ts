import { privateApi } from "@/shared/api/instance";
import { applicationResponseSchema, type ApplicationResponse, type RegistrationFormData } from "../model/schema";

export const submitApplication = async (data: RegistrationFormData) => {
  const response = await privateApi.post<ApplicationResponse>("/applications", data);

  return applicationResponseSchema.parse(response.data);
};
