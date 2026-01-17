import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { userStore } from "@/entities/user";
import { authApi } from "@/features/auth";
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader";
import { routerConfig } from "../config/routerConfig";

export const AppRouter = () => {
  const isLoading = userStore.useIsLoading();

  useEffect(() => {
    authApi.refresh();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return <RouterProvider router={routerConfig} />;
};
