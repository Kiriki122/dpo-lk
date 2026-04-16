import { privateApi } from "@/shared/api/instance";
import { ApplicationSchema, type Application } from "../model/types";

export const courseApi = {
  getUserApplications: async () => {
    const response = await privateApi.get<Application[]>("/applications/me");
    return ApplicationSchema.array().parse(response.data);
  },
};
