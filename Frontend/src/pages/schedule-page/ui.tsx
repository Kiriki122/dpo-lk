import { Typography } from "@mui/material";

import { ScheduleCalendar } from "@/widgets/shedule-calendar";

export const SchedulePage = () => {
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom>
        Расписание
      </Typography>
      <ScheduleCalendar />
    </>
  );
};

export default SchedulePage;
