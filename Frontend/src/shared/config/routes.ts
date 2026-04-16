import type { ObjectPropertyPaths } from "../types/common";

export const pathKeys = {
  root: "/",
  login: "/login",
  courses: "/courses",
  enroll: {
    root: "/enroll",
    byIdPattern: "/enroll/:id",
    byId: (id: string) => `/enroll/${id}`,
  },
  applications: "/applications",
  // documents: "/documents",
  // schedule: "/schedule",
  profile: "/profile",
} as const;

export type AppPath = ObjectPropertyPaths<typeof pathKeys>;
