import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Card, CardActionArea, CardContent, Box, Typography } from "@mui/material";

import type { Course } from "../model/types";

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard = ({ course, onClick }: CourseCardProps) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={() => onClick(course)} sx={{ flexGrow: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            noWrap
            gutterBottom
            variant="h6"
            sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
          >
            {course.name}
          </Typography>
          <Box sx={{ mb: 2 }} />
          <Box display="flex" alignItems="center" color="text.secondary" sx={{ marginTop: "auto" }}>
            <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
            <Typography variant="body2">{course.hours} ак.ч.</Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
