import { Box, useTheme, useMediaQuery } from "@mui/material";

import { MobileSidebar } from "./MobileSidebar";
import { PCSidebar } from "./PCSidebar";

import type { SidebarLink } from "../model/types";

type AppSidebarProps = {
  open: boolean;
  links: SidebarLink[] | undefined;
  onClose: () => void;
  width?: number;
  miniWidth?: number;
};

export const AppSidebar = ({ open, links, onClose, width = 300, miniWidth = 64 }: AppSidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box component="nav" sx={{ width: { md: open ? width : miniWidth }, flexShrink: { md: 0 } }}>
      {isMobile && <MobileSidebar open={open} onClose={onClose} links={links} width={width} />}

      {!isMobile && <PCSidebar open={open} links={links} width={width} miniWidth={miniWidth} />}
    </Box>
  );
};

export default AppSidebar;
