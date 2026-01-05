import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { userController, useUserIsLoading } from "@/entities/user";
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader";
import { routerConfig } from "../config/routerConfig";

export const AppRouter = () => {
  const isLoading = useUserIsLoading();

  useEffect(() => {
    userController.checkAuth();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return <RouterProvider router={routerConfig} />;
};
