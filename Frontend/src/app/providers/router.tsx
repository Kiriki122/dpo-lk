import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation, createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";

import { checkAuth, useIsAuth, useUserIsLoading } from "@/entities/user";
import { EnrollPage } from "@/pages/enroll-page";
import { LoginPage } from "@/pages/login";
import { MyCoursesPage } from "@/pages/my-courses-page";
import { MyDocumentsPage } from "@/pages/my-documents-page";
import { SchedulePage } from "@/pages/schedule-page";
import { pathKeys } from "@/shared/router";
import { MainLayout } from "@/shared/ui/MainLayout/MainLayout";

const ProtectedRoutes = () => {
  const isAuth = useIsAuth();
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={pathKeys.login} state={{ from: location }} replace />;
  }

  return <Outlet />;
};

const PublicRoutes = () => {
  const isAuth = useIsAuth();

  if (isAuth) {
    return <Navigate to={pathKeys.root} replace />;
  }

  return <Outlet />;
};
// -------------------------

const AppRouterConfig = createBrowserRouter([
  {
    path: pathKeys.root,
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: pathKeys.root, element: <Navigate to={pathKeys.myCourses} replace /> },
          { path: pathKeys.myCourses, element: <MyCoursesPage /> },
          { path: pathKeys.enroll.root, element: <EnrollPage /> },
          { path: pathKeys.documents, element: <MyDocumentsPage /> },
          { path: pathKeys.schedule, element: <SchedulePage /> },
        ],
      },
    ],
  },
  {
    element: <PublicRoutes />,
    children: [{ path: pathKeys.login, element: <LoginPage /> }],
  },

  { path: "*", element: <Typography>404</Typography> },
]);

export const AppRouter = () => {
  const isLoading = useUserIsLoading();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", flexGrow: 1, height: "100dvh", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress size={100} />
      </Box>
    );
  }

  return <RouterProvider router={AppRouterConfig} />;
};
