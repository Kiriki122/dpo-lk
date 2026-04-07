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
  const userFullName = user ? `${user?.lastName} ${user?.firstName} ${user?.middleName}` : "";
  const userPhone = user?.phone || "";
  const userEmail = user?.email || "";

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegistrationFormSchema),
    defaultValues: {
      course_uid: initialCourseId,
      student_fio: userFullName,
      phone: userPhone,
      email: userEmail,
    },
  });

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
    await submitApplication(data);
  };

  if (isCoursesLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper
      sx={{
        p: 4,
        maxWidth: 750,
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        justifyContent: "center",
        mt: 4,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          maxWidth: 500,
          flexGrow: 1,
        }}
      >
        {/* Поле выбора курса */}
        <Controller
          name="course_uid"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.course_uid}>
              <InputLabel id="course-select-label">Выберите курс</InputLabel>
              <Select {...field} labelId="course-select-label" label="Выберите курс">
                {courses?.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {/* Пользователь видит название, а в форму улетает id */}
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
              label="ФИО студента"
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

        <Collapse in={isSuccess} timeout={{ exit: 0, enter: 300 }} sx={{ mt: isSuccess ? 2 : 0 }}>
          <Alert severity="success">Заявка на курс успешно отправлена!</Alert>
        </Collapse>

        <Collapse in={isError} timeout={{ exit: 0, enter: 500 }} sx={{ mt: isError ? 2 : 0 }}>
          <Alert severity="error">{submitError}</Alert>
        </Collapse>
      </Box>
    </Paper>
  );
};
