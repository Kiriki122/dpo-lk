import CloseIcon from "@mui/icons-material/Close";
import { Typography, CircularProgress, Box, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { useState, useMemo, useCallback } from "react";

import { type CourseStatus, useFetchCourses, type Course } from "@/entities/course";
import { FilterCourses } from "@/features/course/FilterCourses";
import { CourseDetails } from "@/widgets/course-details";
import { CourseList } from "@/widgets/course-list";

interface Filters {
  status: "all" | CourseStatus;
  searchQuery: string;
}

export const MyCoursesPage = () => {
  const { data: allCourses, isLoading, error } = useFetchCourses();

  const [filters, setFilters] = useState<Filters>({ status: "all", searchQuery: "" });

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Обработчик изменения фильтров
  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  // 2. Обработчик клика по карточке курса
  const handleCourseClick = useCallback((course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  }, []);

  // 3. Обработчик закрытия модального окна
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  }, []);

  // 4. Фильтрация списка курсов
  const filteredCourses = useMemo(() => {
    let list = allCourses;
    const { status, searchQuery } = filters;
    const normalizedQuery = searchQuery.trim().toLowerCase();

    // Фильтрация по статусу
    if (status !== "all") {
      list = list.filter((course) => course.status === status);
    }

    // Фильтрация по поисковому запросу
    if (normalizedQuery) {
      list = list.filter((course) => course.title.toLowerCase().includes(normalizedQuery));
    }

    return list;
  }, [allCourses, filters]);

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Мои курсы
      </Typography>

      {/* ФИЧА: Фильтрация и Поиск */}
      <FilterCourses onFilterChange={handleFilterChange} />

      {/* ОБРАБОТКА СОСТОЯНИЙ */}
      {isLoading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" variant="h6" mt={4}>
          Ошибка загрузки данных: {error}
        </Typography>
      )}

      {!isLoading && !error && (
        // ВИДЖЕТ: Список курсов
        <CourseList courses={filteredCourses} onCourseClick={handleCourseClick} />
      )}

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
        <DialogContent dividers>
          {selectedCourse && (
            // ВИДЖЕТ: Детальная информация
            <CourseDetails course={selectedCourse} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyCoursesPage;
