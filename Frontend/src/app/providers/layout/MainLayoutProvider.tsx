import { Outlet } from "react-router-dom";

import { userStore } from "@/entities/user";
import { sidebarLinks } from "@/shared/config/sidebarConfig";
import { NameWithAvatar } from "@/shared/ui/Header/NameWithAvatar";
import { MainLayout } from "@/shared/ui/MainLayout/MainLayout";

export const MainLayoutProvider = () => {
  const user = userStore.useUser();
  return (
    <MainLayout headerTopRightSlot={<NameWithAvatar name={user?.firstName} />} sidebarLinks={sidebarLinks}>
      <Outlet />
    </MainLayout>
  );
};
