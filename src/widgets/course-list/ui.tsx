// widgets/CourseList/ui/CourseList.tsx
import { Grid, Typography } from "@mui/material";

import { CourseCard, type Course } from "@/entities/course";

interface CourseListProps {
  courses: Course[];
  onCourseClick: (course: Course) => void;
}

export const CourseList = ({ courses, onCourseClick }: CourseListProps) => {
  if (courses.length === 0) {
    return (
      <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
        Курсы по заданным критериям не найдены.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid key={course.id} size={{ xs: 12, md: 6, lg: 4 }}>
          <CourseCard course={course} onClick={onCourseClick} />
        </Grid>
      ))}
    </Grid>
  );
};
