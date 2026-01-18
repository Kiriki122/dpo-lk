import { useQueryClient } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { userStore } from "@/entities/user";
import { pathKeys } from "@/shared/config/routes";
import { sessionStore } from "@/shared/session";

export const ProtectedRoutes = () => {
  const isAuth = sessionStore.useIsAuthenticated();
  const location = useLocation();
  const queryClient = useQueryClient();

  if (!isAuth) {
    userStore.clearUser();
    queryClient.clear();
    return <Navigate to={pathKeys.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const PublicRoutes = () => {
  const isAuth = sessionStore.useIsAuthenticated();

  if (isAuth) {
    return <Navigate to={pathKeys.root} replace />;
  }

  return <Outlet />;
};
