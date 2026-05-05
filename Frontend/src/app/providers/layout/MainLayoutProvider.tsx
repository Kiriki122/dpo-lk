import { Outlet } from "react-router";

import { userStore } from "@/entities/user";
import { ChangePasswordNag } from "@/features/user/change-password";
import { NameWithAvatar } from "@/shared/ui/Header/NameWithAvatar";
import { MainLayout } from "@/shared/ui/MainLayout/MainLayout";

export const MainLayoutProvider = () => {
  const user = userStore.useUser();
  return (
    <MainLayout
      headerTopRightSlot={<NameWithAvatar name={user.firstName || "Пользователь"} />}
      footerSlot={<ChangePasswordNag />}
    >
      <Outlet />
    </MainLayout>
  );
};
