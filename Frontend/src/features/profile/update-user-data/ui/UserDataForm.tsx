import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Stack, Typography, Box, Collapse, Alert } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from "react-number-format";

import { userStore } from "@/entities/user";
import { useUpdateUserMutation } from "../model/query";
import { defaultUserDataValues, userDataSchema, type UserDataForm as UserDataFormType } from "../model/schema";

export const UserDataForm = () => {
  const user = userStore.useUser();

  const { mutate, isPending, isSuccess } = useUpdateUserMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<UserDataFormType>({
    resolver: zodResolver(userDataSchema),
    defaultValues: { ...defaultUserDataValues, email: user.email },
  });

  const passportIssuedByValue = watch("passport.passportIssuedBy");
  const registrationAddressValue = watch("registrationAddress");

  const onSubmit = (data: UserDataFormType) => {
    mutate(data);
    reset();
  };

  return (
    <>
      {!isSuccess && (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <input type="hidden" {...register("email")} />
          <Stack spacing={3}>
            <TextField
              label="Дата рождения"
              type="date"
              slotProps={{ inputLabel: { shrink: true } }}
              {...register("birthDate")}
              error={!!errors.birthDate}
              helperText={errors.birthDate?.message}
              fullWidth
            />

            <Controller
              name="snils"
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <PatternFormat
                  format="###-###-### ##"
                  mask="_"
                  customInput={TextField}
                  getInputRef={ref}
                  onBlur={onBlur}
                  value={value || ""}
                  onValueChange={(values) => {
                    onChange(values.value);
                  }}
                  label="СНИЛС"
                  error={!!errors.snils}
                  helperText={errors.snils?.message}
                  slotProps={{ inputLabel: { shrink: !!value } }}
                  fullWidth
                />
              )}
            />

            {/* Секция паспорта */}
            <Box sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Паспортные данные
              </Typography>
              <Stack spacing={2}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Controller
                    name="passport.passportSeries"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <PatternFormat
                        format="####"
                        mask="_"
                        customInput={TextField}
                        getInputRef={ref}
                        onBlur={onBlur}
                        value={value || ""}
                        onValueChange={(values) => onChange(values.value)}
                        label="Серия"
                        error={!!errors.passport?.passportSeries}
                        helperText={errors.passport?.passportSeries?.message}
                        slotProps={{ inputLabel: { shrink: !!value } }}
                        fullWidth
                      />
                    )}
                  />
                  <Controller
                    name="passport.passportNumber"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <PatternFormat
                        format="######"
                        mask="_"
                        customInput={TextField}
                        getInputRef={ref}
                        onBlur={onBlur}
                        value={value || ""}
                        onValueChange={(values) => onChange(values.value)}
                        label="Номер"
                        error={!!errors.passport?.passportNumber}
                        helperText={errors.passport?.passportNumber?.message}
                        slotProps={{ inputLabel: { shrink: !!value } }}
                        fullWidth
                      />
                    )}
                  />
                </Stack>

                <TextField
                  label="Кем выдан"
                  {...register("passport.passportIssuedBy")}
                  error={!!errors.passport?.passportIssuedBy}
                  helperText={errors.passport?.passportIssuedBy?.message}
                  slotProps={{ inputLabel: { shrink: !!passportIssuedByValue } }}
                  fullWidth
                />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <Controller
                    name="passport.passportDivisionCode"
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <PatternFormat
                        format="###-###"
                        mask="_"
                        customInput={TextField}
                        getInputRef={ref}
                        onBlur={onBlur}
                        value={value || ""}
                        onValueChange={(values) => {
                          onChange(values.formattedValue);
                        }}
                        label="Код подразделения"
                        error={!!errors.passport?.passportDivisionCode}
                        helperText={errors.passport?.passportDivisionCode?.message}
                        slotProps={{ inputLabel: { shrink: !!value } }}
                        fullWidth
                      />
                    )}
                  />
                  <TextField
                    label="Дата выдачи"
                    type="date"
                    slotProps={{ inputLabel: { shrink: true } }}
                    {...register("passport.passportIssueDate")}
                    error={!!errors.passport?.passportIssueDate}
                    helperText={errors.passport?.passportIssueDate?.message}
                    fullWidth
                  />
                </Stack>
              </Stack>
            </Box>

            <TextField
              label="Адрес регистрации"
              multiline
              rows={2}
              {...register("registrationAddress")}
              error={!!errors.registrationAddress}
              helperText={errors.registrationAddress?.message}
              slotProps={{ inputLabel: { shrink: !!registrationAddressValue } }}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isPending || isSuccess}
              loading={isPending}
            >
              Сохранить изменения
            </Button>

            <Collapse
              in={!!errors.root}
              timeout={{ exit: 0, enter: 500 }}
              sx={{ mt: errors.root ? 2 : 0, width: "100%", alignSelf: "center" }}
            >
              <Alert severity="error">{errors.root?.message}</Alert>
            </Collapse>
          </Stack>
        </form>
      )}
      {isSuccess && (
        <Collapse
          in={isSuccess}
          timeout={{ exit: 0, enter: 300 }}
          sx={{ mt: isSuccess ? 2 : 0, width: "100%", alignSelf: "center" }}
        >
          <Alert severity="success">Данные успешно обновлены!</Alert>
        </Collapse>
      )}
    </>
  );
};
