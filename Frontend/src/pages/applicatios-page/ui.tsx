import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { useState, useCallback } from "react";

import { useApplicationsQuery, type Application } from "@/entities/application";
import { ApplicationDetails } from "@/widgets/application-details";
import { ApplicationList } from "@/widgets/application-list";

export const ApplicationsPage = () => {
  const { applications, error, isLoading } = useApplicationsQuery();

  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplicationClick = useCallback((application: Application) => {
    setSelectedApplication(application);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  }, []);

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
        <>
          <ApplicationList applications={applications} onApplicationClick={handleApplicationClick} />

          {/* МОДАЛЬНОЕ ОКНО для деталей заявки */}
          <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth scroll="paper">
            <DialogTitle>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                Детали заявки
                <IconButton onClick={handleCloseModal} aria-label="close">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              {selectedApplication && <ApplicationDetails application={selectedApplication} />}
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default ApplicationsPage;
