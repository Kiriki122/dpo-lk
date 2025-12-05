import { Alert, Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useState, useMemo } from "react";

import { type Session, SessionCard, useFetchSessions } from "@/entities/session";
import { ScheduleControls, type ViewMode } from "@/features/session/schedule-controls";
import { SessionDetailsModal } from "@/features/session/session-details";
import {
  daysOfWeek,
  getDaysInMonth,
  getFirstDayOfMonth,
  addMonths,
  addWeeks,
  isSameDay,
  getStartOfWeek,
} from "@/shared/lib/date/calendarUtils";

export const ScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("month");

  const { data: sessions, isLoading, error } = useFetchSessions();

  // Состояние модалки
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Handlers ---
  const handleNext = () => {
    setCurrentDate((prev) => (viewMode === "month" ? addMonths(prev, 1) : addWeeks(prev, 1)));
  };

  const handlePrev = () => {
    setCurrentDate((prev) => (viewMode === "month" ? addMonths(prev, -1) : addWeeks(prev, -1)));
  };

  const handleToday = () => setCurrentDate(new Date());

  const handleSessionClick = (session: Session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  // --- Логика генерации ячеек календаря ---
  const calendarCells = useMemo(() => {
    if (isLoading || error) return [];

    const cells: { date: Date; sessions: Session[]; isCurrentMonth: boolean }[] = [];

    if (viewMode === "month") {
      const daysCount = getDaysInMonth(currentDate);
      const startDay = getFirstDayOfMonth(currentDate);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();

      // Пустые ячейки в начале
      for (let i = 0; i < startDay; i++) {
        cells.push({ date: new Date(year, month, -startDay + i + 1), sessions: [], isCurrentMonth: false });
      }

      // Дни месяца
      for (let day = 1; day <= daysCount; day++) {
        const date = new Date(year, month, day);
        const daySessions = sessions.filter((s) => isSameDay(new Date(s.startDateTime), date));
        cells.push({ date, sessions: daySessions, isCurrentMonth: true });
      }
    } else {
      // Режим 'week'
      const startOfWeek = getStartOfWeek(currentDate);
      for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const daySessions = sessions.filter((s) => isSameDay(new Date(s.startDateTime), date));
        cells.push({ date, sessions: daySessions, isCurrentMonth: true });
      }
    }
    return cells;
  }, [currentDate, viewMode, sessions, isLoading, error]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 5 }}>
        <CircularProgress />
        <Typography ml={2}>Загрузка расписания...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      {/* Controls Feature */}
      <ScheduleControls
        currentDate={currentDate}
        viewMode={viewMode}
        onViewChange={setViewMode}
        onNext={handleNext}
        onPrev={handlePrev}
        onToday={handleToday}
      />

      {/* Grid Header (Mon, Tue...) */}
      <Grid container spacing={1} sx={{ mb: 1 }}>
        {daysOfWeek.map((day) => (
          <Grid size={{ xs: 12 / 7 }} key={day} sx={{ textAlign: "center" }}>
            <Typography variant="subtitle2" fontWeight="bold" color="text.secondary">
              {day}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Calendar Grid */}
      <Grid container spacing={1}>
        {calendarCells.map((cell, index) => {
          const isToday = isSameDay(cell.date, new Date());

          return (
            <Grid
              size={{ xs: 12 / 7 }}
              key={index}
              sx={{
                height: viewMode === "month" ? 120 : 400, // В неделе ячейки выше
                minHeight: 100,
              }}
            >
              <Paper
                variant="outlined"
                sx={{
                  height: "100%",
                  p: 1,
                  bgcolor: isToday ? "#e3f2fd" : cell.isCurrentMonth ? "background.paper" : "#f5f5f5",
                  borderColor: isToday ? "primary.main" : "divider",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    alignSelf: "flex-end",
                    fontWeight: isToday ? "bold" : "normal",
                    color: isToday ? "primary.main" : "text.secondary",
                    mb: 1,
                  }}
                >
                  {cell.date.getDate()}
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                  {cell.sessions.map((session) => (
                    <SessionCard key={session.id} session={session} onClick={handleSessionClick} />
                  ))}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* Details Feature */}
      <SessionDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} session={selectedSession} />
    </Box>
  );
};
