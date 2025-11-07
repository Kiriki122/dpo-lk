import { Typography, Link, Paper } from "@mui/material";
import React, { useState } from "react";

import { AuthByCredentialsForm } from "@/features/auth/by-credentials";

export const LoginFormWidget = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleForgotPasswordClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setShowForgotPassword(true);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography component="h1" variant="h5">
        Вход
      </Typography>

      <AuthByCredentialsForm />

      {!showForgotPassword ? (
        <Link href="#" variant="body2" onClick={handleForgotPasswordClick}>
          Забыли пароль?
        </Link>
      ) : (
        <Typography variant="body2" color="text.secondary">
          Для восстановления пароля обратитесь к администратору:{" "}
          <Link href="mailto:admin@support.com">admin@support.com</Link>
        </Typography>
      )}
    </Paper>
  );
};
