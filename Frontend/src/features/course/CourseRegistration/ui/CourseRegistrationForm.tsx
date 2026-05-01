import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box,
  CircularProgress,
  Alert,
  Collapse,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { useCoursesQuery } from "@/entities/course";
import { userStore } from "@/entities/user";
import { useSubmitApplication } from "../model/queries";
import { RegistrationFormSchema, type RegistrationFormData } from "../model/schema";

interface CourseRegistrationFormProps {
  initialCourseId?: string;
}

export const CourseRegistrationForm = ({ initialCourseId = "" }: CourseRegistrationFormProps) => {
  const { data: courses, isLoading: isCoursesLoading } = useCoursesQuery();
  const user = userStore.useUser();
  const userFullName = `${user.lastName} ${user.firstName} ${user.middleName}`;
  const userPhone = user.phone;
  const userEmail = user.email;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      course_uid: initialCourseId,
      student_fio: userFullName,
      phone: userPhone,
      email: userEmail,
    },
  });

  useEffect(() => {
    if (courses && initialCourseId) {
      const isValidCourseId = courses.some((course) => course.id === initialCourseId);

      if (!isValidCourseId) {
        setValue("course_uid", "");
      }
    }
  }, [courses, initialCourseId, setValue]);

  const {
    submitApplication,
    isPending,
    error: submitError,
    isError,
    isSuccess,
  } = useSubmitApplication(() => {
    reset(); // Очищаем форму при успешном запросе
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      await submitApplication(data);
    } catch (error) {
      const _err = error;
      console.log(_err);
    }
  };

  if (isCoursesLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 750,
        display: "flex",
        flexDirection: "column",
        mt: 4,
        ml: "auto",
        mr: "auto",
      }}
      elevation={8}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
        }}
      >
        {/* Поле выбора курса */}
        <Controller
          name="course_uid"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.course_uid} sx={{ minWidth: 0 }}>
              <InputLabel id="course-select-label">Выберите курс</InputLabel>
              <Select
                {...field}
                labelId="course-select-label"
                label="Выберите курс"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      width: 0,
                    },
                  },
                }}
                sx={{
                  overflow: "hidden",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {courses?.map((course) => (
                  <MenuItem
                    key={course.id}
                    value={course.id}
                    title={course.name}
                    sx={{
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.course_uid?.message}</FormHelperText>
            </FormControl>
          )}
        />

        {/* Поле ФИО */}
        <Controller
          name="student_fio"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="ФИО слушателя"
              variant="outlined"
              fullWidth
              error={!!errors.student_fio}
              helperText={errors.student_fio?.message}
            />
          )}
        />

        {/* Поле Телефон */}
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Номер телефона"
              variant="outlined"
              fullWidth
              type="tel"
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          )}
        />

        {/* Поле Email */}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" color="primary" size="large" loading={isPending}>
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Записаться на курс"}
        </Button>
      </Box>
      <Collapse
        in={isSuccess}
        timeout={{ exit: 0, enter: 300 }}
        sx={{ mt: isSuccess ? 2 : 0, width: "100%", alignSelf: "center" }}
      >
        <Alert severity="success">Заявка на курс успешно отправлена!</Alert>
      </Collapse>

      <Collapse
        in={isError}
        timeout={{ exit: 0, enter: 500 }}
        sx={{ mt: isError ? 2 : 0, width: "100%", alignSelf: "center" }}
      >
        <Alert severity="error">{submitError}</Alert>
      </Collapse>
    </Paper>
  );
};
