import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Toolbar, IconButton, Container, Box, Typography, Avatar, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { pathKeys } from "@/shared/router";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <AppBar position="fixed" elevation={4} sx={{ top: 0, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", p: { xs: 0 } }}>
          <Link to={pathKeys.root}>
            <img src="/logo.svg" style={{ display: "block", height: "40px" }} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle1" noWrap>
              Иванов Иван
            </Typography>
            <Avatar alt="Иванов Иван">ИИ</Avatar>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
