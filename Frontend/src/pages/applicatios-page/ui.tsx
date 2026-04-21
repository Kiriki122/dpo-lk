import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import { useApplicationsQuery } from "@/entities/application";
import { ApplicationList } from "@/widgets/application-list";

export const ApplicationsPage = () => {
  const { applications, error, isLoading } = useApplicationsQuery();
  const handleApplicationClick = () => {};
  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 6 }}>
        Мои заявки на курсы
      </Typography>
      {isLoading && (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 4 }}>
          <CircularProgress />
          <Typography ml={2}>Загрузка заявок...</Typography>
        </Box>
      )}

      {error && <Alert severity="error">Ошибка во время загрузки заявок: {error}</Alert>}

      {!isLoading && !error && (
        <ApplicationList applications={applications} onApplicationClick={handleApplicationClick} />
      )}
    </>
  );
};

export default ApplicationsPage;
