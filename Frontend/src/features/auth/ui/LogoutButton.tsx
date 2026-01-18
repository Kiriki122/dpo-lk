import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

import { useLogout } from "../model/queries";

export const LogoutButton = () => {
  const { logout, isPending } = useLogout();

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={() => logout()}
      size="large"
      loading={isPending}
      loadingPosition="end"
      endIcon={<LogoutIcon />}
    >
      Выйти
    </Button>
  );
};
