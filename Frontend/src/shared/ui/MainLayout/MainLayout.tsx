import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import { Suspense, useEffect, useState } from "react";

import { ContentLoader } from "@/shared/ui/ContentLoader/ContentLoader";
import { Header } from "@/shared/ui/Header/Header";
import { AppSidebar, sidebarLinks } from "../Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
  headerTopRightSlot?: React.ReactNode;
};

export const MainLayout = ({ children, headerTopRightSlot }: MainLayoutProps) => {
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
    <Box sx={{ display: "flex" }}>
      <Header onMenuClick={toggleSidebar} topRightslot={headerTopRightSlot} />
      <AppSidebar open={isSidebarOpen} onClose={handleSidebarClose} links={sidebarLinks} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
        }}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        <Container sx={{ my: 3 }}>
          <Suspense fallback={<ContentLoader />}>{children}</Suspense>
        </Container>
      </Box>
    </Box>
  );
};
