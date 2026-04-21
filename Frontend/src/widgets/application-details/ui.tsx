import { Box, Divider, Typography } from "@mui/material";

import type { Application } from "@/entities/application";

interface ApplicationDetailsProps {
  application: Application;
}

export const ApplicationDetails = ({ application }: ApplicationDetailsProps) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {application.courseName}
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ textWrapStyle: "pretty" }}>
        Дата подачи заявки:
      </Typography>
      <Typography variant="body1">{application.date.toLocaleDateString("ru-RU")}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ textWrapStyle: "pretty" }}>
        Статус заявки:
      </Typography>
      <Typography variant="body1">{application.status}</Typography>
    </Box>
  );
};
