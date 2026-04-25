import { Box, Divider, Typography } from "@mui/material";

import type { Application } from "@/entities/application";
import { DocumentDownloadButton } from "@/features/application/get-application-documents";
import { ApplicationsDocumentsUploadForm } from "@/features/application/upload-application-documents";

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

      <Divider sx={{ my: 2, mb: 8 }} />

      <Typography variant="h4" component="h2" gutterBottom>
        Загрузка документов
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ textWrapStyle: "pretty" }}>
        Скачайте документы по кнопке ниже
      </Typography>

      <DocumentDownloadButton DocNumber={application.number} />

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ textWrapStyle: "pretty" }}>
        Загрузите подписанные документы по кнопке ниже
      </Typography>

      <ApplicationsDocumentsUploadForm DocNumber={application.number} />
    </Box>
  );
};
