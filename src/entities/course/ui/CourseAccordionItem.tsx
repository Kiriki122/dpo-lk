import DownloadIcon from "@mui/icons-material/Download";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip,
} from "@mui/material";

import { type ProgramWithDocuments } from "@/shared/types/document";

interface CourseAccordionItemProps {
  program: ProgramWithDocuments;
}

export const CourseAccordionItem = ({ program }: CourseAccordionItemProps) => {
  const hasDocuments = program.documents && program.documents.length > 0;

  return (
    <Accordion defaultExpanded={!hasDocuments} sx={{ mb: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ bgcolor: hasDocuments ? "#f0f0f0" : "#fafafa" }}>
        <Typography variant="h6">{program.title}</Typography>
      </AccordionSummary>

      {hasDocuments ? (
        <AccordionDetails>
          <Typography variant="subtitle1" gutterBottom>
            Доступные документы:
          </Typography>
          <List dense>
            {program.documents.map((document) => (
              <ListItem
                key={document.id}
                sx={{
                  mt: 1, 
                  p: 1.5,
                  borderRadius: 1, 
                  bgcolor: "background.paper", 
                  border: "1px solid",
                  borderColor: "divider", 
                  transition: "background-color 0.2s",
                  "&:hover": {
                    bgcolor: "#f0f0f0",
                  },
                }}
                secondaryAction={
                  <Tooltip title="Скачать документ">
                    <a href={document.downloadUrl} download={document.name} target="_blank" rel="noopener noreferrer">
                      <IconButton edge="end" aria-label="download">
                        <DownloadIcon />
                      </IconButton>
                    </a>
                  </Tooltip>
                }
              >
                <ListItemText primary={document.name} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      ) : (
        <AccordionDetails>
          <Typography variant="subtitle1" gutterBottom>
            Нет документов доступных для скачивания
          </Typography>
        </AccordionDetails>
      )}
    </Accordion>
  );
};
