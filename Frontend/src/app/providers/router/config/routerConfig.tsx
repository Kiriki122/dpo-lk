import { lazy } from "react";
import { createBrowserRouter, Navigate, type RouteObject } from "react-router";

import { pathKeys } from "@/shared/config/routes";
import { MainLayoutProvider } from "../../layout/MainLayoutProvider";
import { PersistLogin, ProtectedRoutes, PublicRoutes } from "../ui/AuthGuards";

const CourseRegistrationPage = lazy(() => import("@/pages/course-registration-page"));
const LoginPage = lazy(() => import("@/pages/login"));
const CoursesPage = lazy(() => import("@/pages/courses-page"));
const MyDocumentsPage = lazy(() => import("@/pages/my-documents-page"));
const SchedulePage = lazy(() => import("@/pages/schedule-page"));
const ProfilePage = lazy(() => import("@/pages/profile-page"));
const NotFoundPage = lazy(() => import("@/pages/not-found-page"));

const protectedRoutes: RouteObject = {
  element: <ProtectedRoutes />,
  children: [
    {
      element: <MainLayoutProvider />,
      children: [
        { index: true, element: <Navigate to={pathKeys.courses} replace /> },
        { path: pathKeys.courses, element: <CoursesPage /> },
        { path: pathKeys.enroll.root, element: <CourseRegistrationPage /> },
        { path: pathKeys.enroll.byIdPattern, element: <CourseRegistrationPage /> },
        { path: pathKeys.documents, element: <MyDocumentsPage /> },
        { path: pathKeys.schedule, element: <SchedulePage /> },
        { path: pathKeys.profile, element: <ProfilePage /> },
      ],
    },
  ],
};

const publicRoutes: RouteObject = {
  element: <PublicRoutes />,
  children: [{ path: pathKeys.login, element: <LoginPage /> }],
};

export const routerConfig = createBrowserRouter([
  {
    element: <PersistLogin />,
    path: pathKeys.root,
    children: [{ ...protectedRoutes }, { ...publicRoutes }, { path: "*", element: <NotFoundPage /> }],
  },
]);
