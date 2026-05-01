import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { Suspense, useEffect, useState } from "react";

import { ContentLoader } from "@/shared/ui/ContentLoader/ContentLoader";
import { Header } from "@/shared/ui/Header/Header";
import { AppSidebar, sidebarLinks } from "../Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
  headerTopRightSlot?: React.ReactNode;
  footerSlot?: React.ReactNode;
};

export const MainLayout = ({ children, headerTopRightSlot, footerSlot = null }: MainLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isSidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <Header onMenuClick={toggleSidebar} topRightSlot={headerTopRightSlot} />
      <AppSidebar open={isSidebarOpen} onClose={handleSidebarClose} links={sidebarLinks} />
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        <Container sx={{ my: 3, flexGrow: 1 }}>
          <Suspense fallback={<ContentLoader />}>{children}</Suspense>
        </Container>
        <Container sx={{ my: 3 }}>{footerSlot}</Container>
      </Box>
    </Box>
  );
};
