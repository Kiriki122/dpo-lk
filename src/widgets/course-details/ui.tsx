// widgets/CourseDetails/ui/CourseDetails.tsx
import {
  Typography,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import type { Course } from "@/entities/course";

interface CourseDetailsProps {
  course: Course;
}

export const CourseDetails = ({ course }: CourseDetailsProps) => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        {course.title}
      </Typography>

      <Box display="flex" gap={3} mb={2}>
        <Typography variant="subtitle1">
          Формат: <strong>{course.format}</strong>
        </Typography>
        <Typography variant="subtitle1">
          Всего часов: <strong>{course.durationHours}</strong>
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Описание
      </Typography>
      <Typography variant="body1">{course.description}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Структура программы ({course.modules.length} модулей)
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Название модуля</TableCell>
              <TableCell align="center">Лекции (ч)</TableCell>
              <TableCell align="center">Практика (ч)</TableCell>
              <TableCell align="center">Сам. работа (ч)</TableCell>
              <TableCell align="center">Всего часов</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course.modules.map((module) => (
              <TableRow key={module.id}>
                <TableCell component="th" scope="row">
                  {module.title}
                </TableCell>
                <TableCell align="center">{module.lectureHours}</TableCell>
                <TableCell align="center">{module.practiceHours}</TableCell>
                <TableCell align="center">{module.selfStudyHours}</TableCell>
                <TableCell align="center">
                  <strong>{module.totalHours}</strong>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
