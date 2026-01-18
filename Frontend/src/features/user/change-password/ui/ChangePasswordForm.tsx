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
  const { changePassword, isPending, error, isError, isSuccess } = useChangePassword();

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
          setTimeout(onSuccess, 3000);
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
      <DialogContent sx={{ pb: 0 }}>
        <Stack spacing={2} sx={{ pt: 1 }}>
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
                disabled={isPending || isSuccess}
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
                disabled={isPending || isSuccess}
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
                disabled={isPending || isSuccess}
              />
            )}
          />
        </Stack>
        <Collapse in={isSuccess} timeout={{ exit: 0, enter: 300 }} sx={{ mt: isSuccess ? 2 : 0 }}>
          <Alert severity="success">Пароль успешно изменен!</Alert>
        </Collapse>

        <Collapse in={isError} timeout={{ exit: 0, enter: 500 }} sx={{ mt: isError ? 2 : 0 }}>
          <Alert severity="error">{error}</Alert>
        </Collapse>
      </DialogContent>
      <DialogActions sx={{ py: 2, px: 3 }}>
        <Button onClick={onCancel} disabled={isPending}>
          Отмена
        </Button>
        <Button type="submit" variant="contained" loading={isPending} disabled={isSuccess}>
          Сохранить
        </Button>
      </DialogActions>
    </Box>
  );
};
