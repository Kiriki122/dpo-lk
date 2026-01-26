import { alpha, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { NavLink } from "react-router";

import type { SidebarLink } from "../model/types";

type SidebarLinksListProps = {
  links: SidebarLink[] | undefined;
  open: boolean;
  onLinkClick?: () => void;
};

export const SidebarLinksList = ({ links, open, onLinkClick }: SidebarLinksListProps) => {
  const theme = useTheme();

  return (
    <List>
      {links?.map((link) => {
        const IconComponent = link.icon;
        return (
          <ListItem key={link.text} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              component={NavLink}
              to={link.path}
              onClick={onLinkClick}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                "&:focus-visible": {
                  backgroundColor: theme.palette.action.focus,
                  outline: `2px solid ${theme.palette.primary.main}`,
                  outlineOffset: "2px",
                  px: 1,
                  mx: 1,
                },
                "&.active": {
                  backgroundColor: theme.palette.action.selected,
                  color: theme.palette.primary.main,
                  "& .MuiListItemIcon-root, & .MuiListItemText-root": {
                    color: "inherit",
                  },
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.action.selected, 0.2),
                  },
                  "&:focus-visible": {
                    backgroundColor: alpha(theme.palette.action.focus, 0.2),
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 0,
                  justifyContent: "center",
                }}
              >
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={link.text} sx={{ transform: open ? "scaleX(1)" : "scaleX(0)" }} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
