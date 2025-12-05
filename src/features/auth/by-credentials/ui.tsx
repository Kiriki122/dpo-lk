import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Alert, CircularProgress, Box } from "@mui/material";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { pathKeys } from "@/shared/router";
import { loginSchema, type LoginFormData } from "./schema";

export const AuthByCredentialsForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (data.login !== "admin@example.com" || data.password !== "password123") {
      setError("root", {
        type: "manual",
        message: "Неправильно введен логин или пароль",
      });
    } else {
      navigate(pathKeys.root);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: "100%" }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="login"
        label="Логин (email или телефон)"
        autoComplete="email"
        autoFocus
        {...register("login")}
        error={!!errors.login}
        helperText={errors.login?.message}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Пароль"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      {errors.root && (
        <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
          {errors.root.message}
        </Alert>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSubmitting}>
        {isSubmitting ? <CircularProgress size={24} /> : "Войти"}
      </Button>
    </Box>
  );
};
