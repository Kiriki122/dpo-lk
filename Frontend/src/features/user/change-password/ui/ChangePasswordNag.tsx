import { Alert, Box, Link as MuiLink } from "@mui/material";
import { useState } from "react";
import { Link as RouterLink } from "react-router";

import { userStore } from "@/entities/user";
import { pathKeys } from "@/shared/config/routes";

export const ChangePasswordNag = () => {
  const user = userStore.useUser();

  const [isHidden, setIsHidden] = useState(false);

  if (!user || user.isPasswordChanged || isHidden) {
    return null;
  }

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Alert severity="warning" onClose={() => setIsHidden(true)}>
        В целях безопасности, пожалуйста, измените свой текущий пароль в своем{" "}
        <MuiLink component={RouterLink} to={pathKeys.profile} color="inherit" underline="always" fontWeight="bold">
          Профиле
        </MuiLink>
      </Alert>
    </Box>
  );
};
