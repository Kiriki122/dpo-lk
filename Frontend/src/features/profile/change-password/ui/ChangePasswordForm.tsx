import { zodResolver } from "@hookform/resolvers/zod";
import CloseIcon from "@mui/icons-material/Close";
import {
  TextField,
  Button,
  Box,
  Alert,
  Stack,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Collapse,
} from "@mui/material";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";

import { useChangePassword } from "../model/queries";
import { changePasswordSchema, type ChangePasswordSchema } from "../model/types";

type ChangePasswordFormProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

export const ChangePasswordForm = ({ onSuccess, onCancel }: ChangePasswordFormProps) => {
  const { mutate: changePassword, isPending, error, isSuccess } = useChangePassword();

  const { control, handleSubmit } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit: SubmitHandler<ChangePasswordSchema> = (data) => {
    const { oldPassword, newPassword } = data;
    changePassword(
      { oldPassword, newPassword },
      {
        onSuccess: () => {
          setTimeout(onSuccess, 1000);
        },
      }
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Смена пароля
          <IconButton onClick={onCancel} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ pt: 1 }}>
          {isSuccess && <Alert severity="success">Пароль успешно изменен!</Alert>}

          <Controller
            name="oldPassword"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Текущий пароль"
                type="password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={isPending}
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Новый пароль"
                type="password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={isPending}
              />
            )}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Подтвердите новый пароль"
                type="password"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={isPending}
              />
            )}
          />
          {error && (
            <Collapse in={!!error}>
              <Alert severity="error">{error.message}</Alert>
            </Collapse>
          )}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ pb: 2, px: 3 }}>
        <Button onClick={onCancel} disabled={isPending}>
          Отмена
        </Button>
        <Button type="submit" variant="contained" loading={isPending}>
          Сохранить
        </Button>
      </DialogActions>
    </Box>
  );
};
