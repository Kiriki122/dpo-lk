import { Avatar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { pathKeys } from "@/shared/config/routes";

export const NameWithAvatar = ({ name }: { name?: string }) => {
  return (
    <Link
      to={pathKeys.profile}
      style={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none" }}
    >
      <Typography variant="subtitle1" noWrap sx={{ mr: 2 }}>
        {name || "User"}
      </Typography>
      <Avatar alt={name || "User"}> {name?.charAt(0) || "U"}</Avatar>
    </Link>
  );
};
