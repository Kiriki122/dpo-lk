import { Grid, Typography } from "@mui/material";

import { ApplicationCard, type Application } from "@/entities/application";

interface ApplicationListProps {
  applications: Application[] | undefined;
  onApplicationClick: (application: Application) => void;
}

export const ApplicationList = ({ applications, onApplicationClick }: ApplicationListProps) => {
  if (!applications) {
    return (
      <Typography color="error" variant="h6" mt={4}>
        Не удалось получить список заявок.
      </Typography>
    );
  }

  if (applications.length === 0) {
    return (
      <Typography variant="h6" color="text.secondary" sx={{ mt: 4 }}>
        У вас еще нет заявок на курсы.
      </Typography>
    );
  }

  return (
    <Grid container spacing={3} alignItems="stretch">
      {applications.map((application) => (
        <Grid key={application.id} size={{ xs: 12, md: 6, lg: 4 }} sx={{ flexGrow: 1 }}>
          <ApplicationCard application={application} onClick={onApplicationClick} />
        </Grid>
      ))}
    </Grid>
  );
};
