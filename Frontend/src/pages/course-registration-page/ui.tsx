import { Typography } from "@mui/material";
import { useParams } from "react-router";

import { CourseRegistrationForm } from "@/features/course/CourseRegistration";

export const CourseRegistrationPage = () => {
  const { id } = useParams<{ id: string }>();
  const initialCourseId = id || "";
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Записаться на курс
      </Typography>
      <CourseRegistrationForm initialCourseId={initialCourseId} />
    </>
  );
};

export default CourseRegistrationPage;
