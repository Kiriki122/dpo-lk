import { useState, useMemo } from "react";

import { type Course } from "@/entities/course";
import { SORT_OPTIONS, type SortOption } from "./types";

export const useCourseFilters = (courses: Course[] | undefined) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<SortOption>(SORT_OPTIONS.NAME_ASC);

  const filteredAndSortedCourses = useMemo(() => {
    if (!courses) return [];

    // 1. Фильтрация
    let result = courses.filter((course) => course.name.toLowerCase().includes(searchQuery.trim().toLowerCase()));

    // 2. Сортировка
    result = result.sort((a, b) => {
      switch (sortOption) {
        case SORT_OPTIONS.NAME_ASC:
          return a.name.localeCompare(b.name);
        case SORT_OPTIONS.NAME_DESC:
          return b.name.localeCompare(a.name);
        case SORT_OPTIONS.HOURS_ASC:
          return (a.hours || 0) - (b.hours || 0);
        case SORT_OPTIONS.HOURS_DESC:
          return (b.hours || 0) - (a.hours || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [courses, searchQuery, sortOption]);

  return {
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    filteredCourses: filteredAndSortedCourses,
  };
};
