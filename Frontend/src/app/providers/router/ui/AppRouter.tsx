import { RouterProvider } from "react-router";

import { routerConfig } from "../config/routerConfig";

export const AppRouter = () => {
  return <RouterProvider router={routerConfig} />;
};
