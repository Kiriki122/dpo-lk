import { Paper, Typography } from "@mui/material";

import { type Session } from "../../model/types";

interface SessionCardProps {
  session: Session;
  onClick: (session: Session) => void;
}

export const SessionCard = ({ session, onClick }: SessionCardProps) => {
  const startTime = new Date(session.startDateTime).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Paper
      elevation={1}
      onClick={(e) => {
        e.stopPropagation();
        onClick(session);
      }}
      sx={{
        p: 1,
        mb: 0.5,
        cursor: "pointer",
        backgroundColor: "primary.light",
        color: "primary.contrastText",
        transition: "0.2s",
        "&:hover": { backgroundColor: "primary.main", elevation: 3 },
      }}
    >
      <Typography variant="caption" display="block" fontWeight="bold">
        {startTime}
      </Typography>
      <Typography variant="caption" sx={{ lineHeight: 1.1, display: "block" }}>
        {session.course.title}
      </Typography>
    </Paper>
  );
};
