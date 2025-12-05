import { Box, CircularProgress, Typography, Alert } from "@mui/material";

import { CourseAccordionItem } from "@/entities/course";
import { useFetchUserProgramsWithDocuments } from "@/shared/api/useFetchUserProgramsWithDocuments";

export const DocumentList = () => {
  const { data, isLoading, error } = useFetchUserProgramsWithDocuments();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 5 }}>
        <CircularProgress />
        <Typography ml={2}>Загрузка документов...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Ошибка при загрузке: {error}
      </Alert>
    );
  }

  const isEmpty = !data || data.length === 0;

  if (isEmpty) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        Пройденных программ, для которых доступны документы, не найдено.
      </Alert>
    );
  }

  return (
    <Box mt={2}>
      <Typography variant="h5" component="h2" gutterBottom sx={{ marginBottom: 2 }}>
        Пройденные программы обучения
      </Typography>
      {data.map((program) => (
        <CourseAccordionItem key={program.id} program={program} />
      ))}
    </Box>
  );
};
