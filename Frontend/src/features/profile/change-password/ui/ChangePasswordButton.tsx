import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { Button, Dialog } from "@mui/material";
import { useState } from "react";

import { ChangePasswordForm } from "./ChangePasswordForm";

export const ChangePasswordButton = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="outlined" startIcon={<VpnKeyIcon />} onClick={handleOpen} size="large">
        Сменить пароль
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <ChangePasswordForm onSuccess={handleClose} onCancel={handleClose} />
      </Dialog>
    </>
  );
};
