import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  useTheme,
  useMediaQuery,
  type Theme,
  type CSSObject,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export interface SidebarLink {
  text: string;
  path: string;
  icon: React.ReactElement;
}

interface SidebarProps {
  open: boolean;
  links: SidebarLink[];
  onClose?: () => void;
  width?: number;
  miniWidth?: number;
}

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
  [theme.breakpoints.up("sm")]: {
    width: `${miniWidth}px`,
  },
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

const Sidebar = ({ open, links, onClose, width = 300, miniWidth = 60 }: SidebarProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  const drawerContent = (
    <List>
      {links.map((link) => (
        <ListItem key={link.text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component={NavLink}
            to={link.path}
            onClick={handleLinkClick}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              "&.active": {
                backgroundColor: theme.palette.action.selected,
                "& .MuiListItemIcon-root, & .MuiListItemText-root": {
                  color: theme.palette.primary.main,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              {link.icon}
            </ListItemIcon>
            <ListItemText primary={link.text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box component="nav" sx={{ width: { md: open ? width : miniWidth }, flexShrink: { md: 0 } }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: width },
          }}
        >
          <Box sx={theme.mixins.toolbar} />
          {drawerContent}
        </Drawer>
      ) : (
        <StyledDrawer variant="permanent" open={open} width={width} miniWidth={miniWidth}>
          <Box sx={theme.mixins.toolbar} />
          {drawerContent}
        </StyledDrawer>
      )}
    </Box>
  );
};

export default Sidebar;
