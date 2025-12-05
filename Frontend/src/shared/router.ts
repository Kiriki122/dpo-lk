export const pathKeys = {
  root: "/",
  login: "/login",
  myCourses: "/my-courses",
  enroll: {
    root: "/enroll",
    byId: (id: number) => `/enroll/${id}`,
  },
  documents: "/documents",
  schedule: "/schedule",
} as const;
