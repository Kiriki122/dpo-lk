import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
} from "@mui/material";
import debounce from "lodash.debounce";
import { useState, useMemo, useEffect, useCallback } from "react";

import { SORT_OPTIONS, type SortOption } from "../model/types";

interface CourseFiltersProps {
  onSearchChange: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
  currentSort: SortOption;
}

export const CourseFilters = ({ onSearchChange, onSortChange, currentSort }: CourseFiltersProps) => {
  const [inputValue, setInputValue] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((searchQuery: string) => onSearchChange(searchQuery), 400),
    [onSearchChange]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  const handleSortChange = useCallback(
    (e: SelectChangeEvent) => {
      onSortChange(e.target.value as SortOption);
    },
    [onSortChange]
  );

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", justifyContent: "flex-end" }}>
      <TextField
        label="Поиск по названию"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        sx={{ flexGrow: 1, minWidth: "250px" }}
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

      <FormControl sx={{ minWidth: "250px" }}>
        <InputLabel id="sort-select-label">Сортировка</InputLabel>
        <Select labelId="sort-select-label" value={currentSort} label="Сортировка" onChange={handleSortChange}>
          <MenuItem value={SORT_OPTIONS.NAME_ASC}>По названию (А - Я)</MenuItem>
          <MenuItem value={SORT_OPTIONS.NAME_DESC}>По названию (Я - А)</MenuItem>
          <MenuItem value={SORT_OPTIONS.HOURS_ASC}>По длительности (возрастание)</MenuItem>
          <MenuItem value={SORT_OPTIONS.HOURS_DESC}>По длительности (убывание)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
