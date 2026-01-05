import { Typography } from "@mui/material";
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { pathKeys } from "@/shared/router";
import { MainLayout } from "@/shared/ui/MainLayout/MainLayout";
import { ProtectedRoutes, PublicRoutes } from "../ui/AuthGuards";

const EnrollPage = lazy(() => import("@/pages/enroll-page"));
const LoginPage = lazy(() => import("@/pages/login"));
const MyCoursesPage = lazy(() => import("@/pages/my-courses-page"));
const MyDocumentsPage = lazy(() => import("@/pages/my-documents-page"));
const SchedulePage = lazy(() => import("@/pages/schedule-page"));

export const routerConfig = createBrowserRouter([
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
  { path: "*", element: <Typography>404 Not Found</Typography> },
]);
