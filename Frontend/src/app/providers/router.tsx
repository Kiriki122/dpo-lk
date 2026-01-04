import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useLocation, createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";

import { checkAuth, useIsAuth, useUserIsLoading } from "@/entities/user";
import { LoginPage } from "@/pages/login";
import { MyCoursesPage } from "@/pages/my-courses-page";
import { MyDocumentsPage } from "@/pages/my-documents-page";
import { SchedulePage } from "@/pages/schedule-page";
import { pathKeys } from "@/shared/router";
import { MainLayout } from "@/shared/ui/MainLayout/MainLayout";

// --- Placeholder Pages ---
const PageContent = ({ title }: { title: string }) => {
  const location = useLocation();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Typography>Это страница "{title}".</Typography>
      <Typography>
        Текущий путь: <code>{location.pathname}</code>
      </Typography>
      <Typography>
        Контент этой страницы рендерится внутри <code>&lt;Outlet /&gt;</code> в компоненте <code>MainLayout</code>.
      </Typography>
      <div style={{ height: 20000 }}>123</div>
    </>
  );
};

const HomePage: React.FC = () => <PageContent title="Главная страница" />;
const EnrollPage: React.FC = () => <PageContent title="Запись на курс" />;

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
          { index: true, element: <HomePage /> },
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
