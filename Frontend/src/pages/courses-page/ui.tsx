import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  CircularProgress,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Alert,
} from "@mui/material";
import { useState, useCallback } from "react";

import { type Course, useCoursesQuery } from "@/entities/course";
import { CourseDetails } from "@/widgets/course-details";
import { CourseList } from "@/widgets/course-list";

export const CoursesPage = () => {
  const { data: courses, isLoading, error } = useCoursesQuery();

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseClick = useCallback((course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  }, []);

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Курсы
      </Typography>

      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 4 }}>
          <CircularProgress />
          <Typography ml={2}>Загрузка курсов...</Typography>
        </Box>
      )}

      {error && <Alert severity="error">Ошибка во время загрузки курсов: {error.message}</Alert>}

      {!isLoading && !error && <CourseList courses={courses} onCourseClick={handleCourseClick} />}

      {/* МОДАЛЬНОЕ ОКНО для деталей курса */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth scroll="paper">
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            Детали курса
            <IconButton onClick={handleCloseModal} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>{selectedCourse && <CourseDetails course={selectedCourse} />}</DialogContent>
      </Dialog>
    </>
  );
};

export default CoursesPage;
