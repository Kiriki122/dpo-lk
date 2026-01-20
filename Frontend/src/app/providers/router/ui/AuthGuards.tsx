import { Navigate, Outlet, useLocation } from "react-router-dom";

import { userStore } from "@/entities/user";
import { useInitSession } from "@/features/auth";
import { pathKeys } from "@/shared/config/routes";
import { sessionStore } from "@/shared/session";
import { PageLoader } from "@/shared/ui/PageLoader/PageLoader";

export const ProtectedRoutes = () => {
  const isAuth = sessionStore.useIsAuthenticated();
  const location = useLocation();

  if (!isAuth) {
    userStore.clearUser();
    return <Navigate to={pathKeys.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const PublicRoutes = () => {
  const isAuth = sessionStore.useIsAuthenticated();
  const location = useLocation();

  if (isAuth) {
    const from = location.state?.from?.pathname || pathKeys.root;
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export const PersistLogin = () => {
  const { isAuthChecked } = useInitSession();

  if (!isAuthChecked) {
    return <PageLoader />;
  }

  return <Outlet />;
};
