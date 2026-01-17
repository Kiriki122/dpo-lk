import type { ObjectPropertyPaths } from "../types/common";

export const pathKeys = {
  root: "/",
  login: "/login",
  courses: "/courses",
  enroll: {
    root: "/enroll",
    byId: (id: number) => `/enroll/${id}`,
  },
  documents: "/documents",
  schedule: "/schedule",
  profile: "/profile",
} as const;

export type AppPath = ObjectPropertyPaths<typeof pathKeys>;
