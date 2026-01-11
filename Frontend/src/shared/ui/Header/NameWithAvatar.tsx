import { Avatar, Stack, Typography } from "@mui/material";

export const NameWithAvatar = ({ name }: { name?: string }) => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="subtitle1" noWrap>
        {name || "User"}
      </Typography>
      <Avatar alt={name || "User"}> {name?.charAt(0) || "U"}</Avatar>
    </Stack>
  );
};
