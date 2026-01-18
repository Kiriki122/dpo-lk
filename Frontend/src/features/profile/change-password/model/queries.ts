import { useMutation } from "@tanstack/react-query";

import { changePassword } from "../api/api";
import type { ChangePasswordSchema } from "./types";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: Omit<ChangePasswordSchema, "confirmPassword">) => changePassword(data),
  });
};
