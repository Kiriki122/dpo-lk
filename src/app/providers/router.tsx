import { Typography } from "@mui/material";
import { useLocation, createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import LoginPage from "@/pages/login";
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
const MyCoursesPage: React.FC = () => <PageContent title="Мои курсы" />;
const EnrollPage: React.FC = () => <PageContent title="Запись на курс" />;
const DocumentsPage: React.FC = () => <PageContent title="Документы" />;
const SchedulePage: React.FC = () => <PageContent title="Расписание" />;

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLogined = true;

  return isLogined ? children : <Navigate to={pathKeys.login} />;
};
// -------------------------

const AppRouterConfig = createBrowserRouter([
  {
    path: pathKeys.root,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: pathKeys.myCourses, element: <MyCoursesPage /> },
      { path: pathKeys.enroll, element: <EnrollPage /> },
      { path: pathKeys.documents, element: <DocumentsPage /> },
      { path: pathKeys.schedule, element: <SchedulePage /> },
    ],
  },
  { path: pathKeys.login, element: <LoginPage /> },

  { path: "*", element: <Typography>404</Typography> },
]);

export const AppRouter = () => <RouterProvider router={AppRouterConfig} />;
