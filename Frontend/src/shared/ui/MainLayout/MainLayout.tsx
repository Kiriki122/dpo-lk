import { Box, Container } from "@mui/material";
import { Suspense, useState } from "react";

import { ContentLoader } from "@/shared/ui/ContentLoader/ContentLoader";
import { Header } from "@/shared/ui/Header/Header";
import { Sidebar, type SidebarLink } from "@/shared/ui/Sidebar/Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
  headerTopRightSlot?: React.ReactNode;
  sidebarLinks: SidebarLink[] | undefined;
};

export const MainLayout = ({ children, headerTopRightSlot, sidebarLinks }: MainLayoutProps) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header onMenuClick={toggleSidebar} topRightslot={headerTopRightSlot} />
      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} links={sidebarLinks} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          minWidth: 0,
        }}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        <Container>
          <Suspense fallback={<ContentLoader />}>{children}</Suspense>
        </Container>
      </Box>
    </Box>
  );
};
