import SearchIcon from "@mui/icons-material/Search";
import { Tabs, Tab, Box, TextField, InputAdornment } from "@mui/material";
import lodashDebounce from "lodash.debounce";
import { useState, useEffect, useMemo } from "react";

interface Filter {
  status: "all" | "enrolled" | "available";
  searchQuery: string;
}

interface FilterCoursesProps {
  onFilterChange: (filters: Filter) => void;
}

export const FilterCourses = ({ onFilterChange }: FilterCoursesProps) => {
  const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "available">("all");
  const [currentSearch, setCurrentSearch] = useState("");
  // Состояние для фактического запроса, который будет передаваться родителю
  const [filterSearchQuery, setFilterSearchQuery] = useState("");

  // Debounced функция, которая обновляет filterSearchQuery
  // Используем useCallback и useMemo для создания и запоминания debounced функции
  const debouncedSetSearchQuery = useMemo(
    () =>
      lodashDebounce((searchQuery: string) => {
        setFilterSearchQuery(searchQuery);
      }, 400),
    []
  );

  // Обработчик изменения ввода в TextField
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = event.target.value;
    setCurrentSearch(newSearch);
    // Вызываем debounced функцию для обновления состояния фильтра
    debouncedSetSearchQuery(newSearch);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: "all" | "enrolled" | "available") => {
    setActiveTab(newValue);
  };

  // Передача изменений родителю при смене таба или при срабатывании debounce
  useEffect(() => {
    onFilterChange({
      status: activeTab,
      searchQuery: filterSearchQuery,
    });
  }, [activeTab, filterSearchQuery, onFilterChange]);

  // Важно: очистка debounce при размонтировании компонента
  useEffect(() => {
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, [debouncedSetSearchQuery]);

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="course status filter">
          <Tab label="Все курсы" value="all" />
          <Tab label="Мои курсы" value="enrolled" />
          <Tab label="Доступные курсы" value="available" />
        </Tabs>
      </Box>

      <TextField
        fullWidth
        label="Поиск по названию курса"
        variant="outlined"
        // Используем currentSearch для немедленного обновления UI
        value={currentSearch}
        onChange={handleSearchChange}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  );
};
