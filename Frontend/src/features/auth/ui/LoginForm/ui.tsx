import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Alert, Box, Collapse } from "@mui/material";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";

import { pathKeys } from "@/shared/config/routes";
import { useLogin } from "../../model/queries";
import { loginFormSchema, type LoginFormData } from "../../model/types";

export const LoginForm = () => {
  const { login, isPending, isError, error: serverError } = useLogin();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || pathKeys.root;

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched",
    defaultValues: { login: "", password: "" },
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    login({ credentials: data, fromPage });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: "100%" }}>
      <Controller
        name="login"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            id="login"
            label="Логин"
            autoComplete="email"
            autoFocus
            error={!!error}
            helperText={error?.message}
            disabled={isPending}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            id="password"
            error={!!error}
            helperText={error?.message}
            disabled={isPending}
          />
        )}
      />
      <Collapse in={isError}>
        <Alert severity="error" sx={{ mt: isError ? 2 : 0 }}>
          {serverError}
        </Alert>
      </Collapse>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} loading={isPending}>
        Войти
      </Button>
    </Box>
  );
};
