import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { useRefresh } from "@/features/auth";
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader";
import { routerConfig } from "../config/routerConfig";

export const AppRouter = () => {
  const { refresh, isPending: isLoading } = useRefresh();

  useEffect(() => {
    refresh();
  }, [refresh]);

  if (isLoading) {
    return <PageLoader />;
  }

  return <RouterProvider router={routerConfig} />;
};
