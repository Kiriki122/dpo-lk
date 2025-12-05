import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Alert, CircularProgress, Box } from "@mui/material";
import { AxiosError } from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { login } from "@/entities/user";
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
    try {
      await login({
        email: data.login,
        password: data.password,
      });

      navigate(pathKeys.root);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 400) {
          setError("root", {
            type: "server",
            message: "Неверный логин или пароль",
          });
          return;
        }

        if (error.response?.status === 500) {
          setError("root", {
            type: "server",
            message: "Ошибка сервера. Попробуйте позже.",
          });
          return;
        }
      } else if (error instanceof z.ZodError) {
        console.error("API response validation failed:", error);
        setError("root", {
          type: "server",
          message: "Ошибка обработки данных с сервера",
        });
        return;
      }

      // Неизвестная ошибка
      setError("root", {
        type: "server",
        message: "Произошла непредвиденная ошибка",
      });
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
