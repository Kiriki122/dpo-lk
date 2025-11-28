import { Box, CircularProgress, Typography, Alert } from "@mui/material";
import { useState, useEffect } from "react";

import { CourseAccordionItem } from "@/entities/course";
import { fetchUserProgramsWithDocuments } from "@/shared/lib/mockApi";
import { type ProgramWithDocuments } from "@/shared/types/document";

export const DocumentList = () => {
  const [data, setData] = useState<ProgramWithDocuments[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchUserProgramsWithDocuments();

        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Произошла неизвестная ошибка при загрузке данных.");
        }
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

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
