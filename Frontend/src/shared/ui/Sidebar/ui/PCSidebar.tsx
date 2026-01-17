import { Box, Drawer, styled, type Theme, type CSSObject } from "@mui/material";

import { SidebarLinksList } from "./SidebarLinksList";

import type { SidebarLink } from "../model/types";

type PCSidebarProps = {
  open: boolean;
  links: SidebarLink[] | undefined;
  width: number;
  miniWidth: number;
};

const openedMixin = (theme: Theme, width: number): CSSObject => ({
  width: width,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme, miniWidth: number): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `${miniWidth}px`,
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "width" && prop !== "miniWidth",
})<{
  open?: boolean;
  width: number;
  miniWidth: number;
}>(({ theme, open, width, miniWidth }) => ({
  width: width,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme, width),
    "& .MuiDrawer-paper": openedMixin(theme, width),
  }),
  ...(!open && {
    ...closedMixin(theme, miniWidth),
    "& .MuiDrawer-paper": closedMixin(theme, miniWidth),
  }),
}));

export const PCSidebar = ({ open, links, width, miniWidth }: PCSidebarProps) => {
  return (
    <StyledDrawer variant="permanent" open={open} width={width} miniWidth={miniWidth}>
      <Box sx={(theme) => theme.mixins.toolbar} />
      <SidebarLinksList links={links} open={open} />
    </StyledDrawer>
  );
};
