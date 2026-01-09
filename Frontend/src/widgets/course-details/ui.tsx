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
        {course.name}
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ textWrapStyle: "pretty" }}>
        Описание
      </Typography>
      <Typography variant="body1">{course.description}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom sx={{ textWrapStyle: "pretty" }}>
        Формат
      </Typography>
      <Typography variant="body1"> {course.mode}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Время на полное прохождение курса
      </Typography>
      <Typography variant="body1">{course.hours} ак.ч.</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" gutterBottom>
        Структура программы
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow selected>
              <TableCell sx={{ fontWeight: 900 }}>Название модуля</TableCell>
              <TableCell sx={{ fontWeight: 900 }} align="center">
                Всего часов
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {course.modules.map((module, index) => (
              <TableRow key={index}>
                <TableCell>{module.title}</TableCell>
                <TableCell align="center">{module.hours} ак.ч.</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
