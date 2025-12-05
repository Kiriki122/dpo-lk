import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box, Button, ButtonGroup, IconButton, Typography } from "@mui/material";

export type ViewMode = "month" | "week";

interface ScheduleControlsProps {
  currentDate: Date;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  onNext: () => void;
  onPrev: () => void;
  onToday: () => void;
}

export const ScheduleControls = ({
  currentDate,
  viewMode,
  onViewChange,
  onNext,
  onPrev,
  onToday,
}: ScheduleControlsProps) => {
  const title = currentDate.toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={onPrev} size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography variant="h5" sx={{ textTransform: "capitalize", minWidth: 150, textAlign: "center" }}>
          {title}
        </Typography>
        <IconButton onClick={onNext} size="small">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
        <Button onClick={onToday} variant="outlined" size="small" sx={{ ml: 2 }}>
          Сегодня
        </Button>
      </Box>

      <ButtonGroup variant="contained" aria-label="view switcher">
        <Button onClick={() => onViewChange("week")} color={viewMode === "week" ? "primary" : "inherit"}>
          Неделя
        </Button>
        <Button onClick={() => onViewChange("month")} color={viewMode === "month" ? "primary" : "inherit"}>
          Месяц
        </Button>
      </ButtonGroup>
    </Box>
  );
};
