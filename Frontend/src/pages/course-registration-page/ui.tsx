import { Typography } from "@mui/material";
import { useSearchParams } from "react-router";

import { CourseRegistrationForm } from "@/features/course/CourseRegistration/ui/CourseRegistrationForm";

export const CourseRegistrationPage = () => {
  const [searchParams] = useSearchParams();
  const initialCourseId = searchParams.get("course_id") || "";
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
