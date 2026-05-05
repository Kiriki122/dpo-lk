import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";

import { UploadUserDocsForm } from "@/features/profile/upload-user-docs";

export const UploadUserDocsAccordion = () => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ borderBottom: "1px solid #eee" }}>
          <Typography variant="h6" fontWeight="bold">
            Загрузка документов
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ paddingTop: 2 }}>
          <UploadUserDocsForm />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
