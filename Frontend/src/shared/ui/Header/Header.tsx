import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Container } from "@mui/material";
import { Link } from "react-router-dom";

import { pathKeys } from "@/shared/config/routes";

interface HeaderProps {
  topRightslot?: React.ReactNode;
  onMenuClick: () => void;
}

export const Header = ({ topRightslot, onMenuClick }: HeaderProps) => {
  return (
    <AppBar position="fixed" elevation={4} sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to={pathKeys.root}>
            <img src="/logo.svg" style={{ display: "block", height: "40px" }} />
          </Link>
          {topRightslot}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
