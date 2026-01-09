import { Outlet } from "react-router-dom";

import { useUser } from "@/entities/user";
import { sidebarLinks } from "@/shared/config/sidebarConfig";
import { MainLayout } from "@/shared/ui/MainLayout/MainLayout";

export const MainLayoutProvider = () => {
  const user = useUser();
  return (
    <MainLayout headerAvatar={{ firstName: user?.firstName, lastname: user?.lastName }} sidebarLinks={sidebarLinks}>
      <Outlet />
    </MainLayout>
  );
};
