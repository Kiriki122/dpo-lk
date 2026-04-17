import { Grid, Typography } from "@mui/material";

import { CourseCard, type Course } from "@/entities/course";

interface CourseListProps {
  courses: Course[] | undefined;
  onCourseClick: (course: Course) => void;
}

export const CourseList = ({ courses, onCourseClick }: CourseListProps) => {
  if (!courses) {
    return (
      <Typography color="error" variant="h6" mt={4}>
        Не удалось получить список курсов
      </Typography>
    );
  }

  if (courses.length === 0) {
    return (
      <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
        Курсы с таким названием не найдены
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} alignItems="stretch">
      {courses.map((course) => (
        <Grid key={course.id} size={{ xs: 12, md: 6, lg: 4 }} sx={{ flexGrow: 1 }}>
          <CourseCard course={course} onClick={onCourseClick} />
        </Grid>
      ))}
    </Grid>
  );
};
