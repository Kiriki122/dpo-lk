import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from "@mui/material";

import { UserDataForm } from "@/features/profile/update-user-data";

export const UserProfileAccordion = () => {
  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ borderBottom: "1px solid #eee" }}>
          <Typography variant="h6" fontWeight="bold">
            Личные данные и паспорт
          </Typography>
        </AccordionSummary>

        <AccordionDetails sx={{ paddingTop: 4 }}>
          <UserDataForm />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
