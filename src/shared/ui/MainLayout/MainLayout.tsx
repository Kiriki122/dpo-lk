import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SchoolIcon from "@mui/icons-material/School";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import { pathKeys } from "@/shared/router";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import type { SidebarLink } from "../Sidebar/Sidebar";

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
          width: { sm: `calc(100% - ${isSidebarOpen ? 300 : 60}px)` },
        }}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        <Container maxWidth="lg">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
