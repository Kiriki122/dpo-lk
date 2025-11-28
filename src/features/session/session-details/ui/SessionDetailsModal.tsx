import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloseIcon from "@mui/icons-material/Close";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Chip } from "@mui/material";

import { type Session } from "@/entities/session";

interface SessionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
}

export const SessionDetailsModal = ({ isOpen, onClose, session }: SessionDetailsModalProps) => {
  if (!session) return null;

  const dateStr = new Date(session.startDateTime).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStart = new Date(session.startDateTime).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  const timeEnd = new Date(session.endDateTime).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle sx={{ m: 0, p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        Детали занятия
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" color="primary" gutterBottom>
          {session.course.title}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Box display="flex" alignItems="center" gap={1}>
            <CalendarTodayIcon color="action" />
            <Typography>{dateStr}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <AccessTimeIcon color="action" />
            <Typography>
              {timeStart} — {timeEnd}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <GroupIcon color="action" />
            <Typography>Группа: {session.group}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon color="action" />
            <Typography>Преп.: {session.teacher}</Typography>
          </Box>

          <Box mt={1}>
            <Chip label={session.course.format} size="small" variant="outlined" />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
