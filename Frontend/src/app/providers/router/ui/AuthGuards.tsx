import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useIsAuth } from "@/entities/user";
import { pathKeys } from "@/shared/config/routes";

export const ProtectedRoutes = () => {
  const isAuth = useIsAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={pathKeys.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const PublicRoutes = () => {
  const isAuth = useIsAuth();

  if (isAuth) {
    return <Navigate to={pathKeys.root} replace />;
  }

  return <Outlet />;
};
