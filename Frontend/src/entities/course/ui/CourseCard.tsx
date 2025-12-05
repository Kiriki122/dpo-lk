import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Card, CardActionArea, CardContent, Box, Chip, Divider, Typography } from "@mui/material";

import type { Course } from "../model/types";

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard = ({ course, onClick }: CourseCardProps) => {
  const statusColor = course.status === "enrolled" ? "primary" : "default";
  const formatColor = course.format === "Онлайн" ? "primary" : course.format === "Смешанный" ? "secondary" : "default";

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={() => onClick(course)} sx={{ flexGrow: 1 }}>
        <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
            <Chip label={course.format} color={formatColor} size="small" />
            <Chip
              label={course.status === "enrolled" ? "Записан" : "Доступен"}
              color={statusColor}
              size="small"
              variant="outlined"
            />
          </Box>
          <Divider sx={{ mb: 1 }} />
          <Typography gutterBottom variant="h6" component="div">
            {course.title}
          </Typography>
          <Box sx={{ mb: 2 }} />
          <Box display="flex" alignItems="center" color="text.secondary" sx={{ marginTop: "auto" }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{course.durationHours} ак.ч.</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
