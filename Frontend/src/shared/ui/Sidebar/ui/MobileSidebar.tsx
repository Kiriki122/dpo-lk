import { Box, Drawer, useTheme } from "@mui/material";

import { SidebarLinksList } from "./SidebarLinksList";

import type { SidebarLink } from "../model/types";

type MobileSidebarProps = {
  open: boolean;
  links: SidebarLink[] | undefined;
  onClose: () => void;
  width: number;
};

export const MobileSidebar = ({ open, links, onClose, width }: MobileSidebarProps) => {
  const theme = useTheme();

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: width },
      }}
    >
      <Box sx={theme.mixins.toolbar} />
      <SidebarLinksList links={links} open={true} onLinkClick={onClose} />
    </Drawer>
  );
};
