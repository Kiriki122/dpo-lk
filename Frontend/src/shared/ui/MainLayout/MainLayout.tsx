import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SchoolIcon from "@mui/icons-material/School";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { pathKeys } from "@/shared/router";
import { Header } from "@/shared/ui/Header/Header";
import { Sidebar, type SidebarLink } from "@/shared/ui/Sidebar/Sidebar";

const sidebarLinks: SidebarLink[] = [
  { text: "Мои курсы", path: pathKeys.myCourses, icon: <SchoolIcon /> },
  { text: "Запись на курс", path: pathKeys.enroll.root, icon: <PlaylistAddCheckIcon /> },
  { text: "Документы", path: pathKeys.documents, icon: <DescriptionIcon /> },
  { text: "Расписание", path: pathKeys.schedule, icon: <CalendarMonthIcon /> },
];

export const MainLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header onMenuClick={toggleSidebar} />
      <Sidebar open={isSidebarOpen} onClose={handleSidebarClose} links={sidebarLinks} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
