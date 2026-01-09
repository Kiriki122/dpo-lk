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
} as const;
