import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userQueryKey } from "@/entities/user";
import { updateUserData } from "../api/updateUser";
import type { UserDataForm } from "./schema";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UserDataForm) => updateUserData(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueryKey });
    },

    onError: (error) => {
      console.error("Ошибка при обновлении данных пользователя:", error);
    },
  });
};
