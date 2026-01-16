import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Card, CardActionArea, CardContent, Box, Typography, Chip, Divider, Button } from "@mui/material";

import type { Course } from "../model/types";

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard = ({ course, onClick }: CourseCardProps) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardActionArea onClick={() => onClick(course)} sx={{ flexGrow: 1 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {course.name}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "5",
              WebkitBoxOrient: "vertical",
              textWrapStyle: "pretty",
              flex: 1,
            }}
          >
            {course.description}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
            <Chip icon={<AccessTimeIcon />} label={`${course.hours} ак.ч`} />
          </Box>
          <Button variant="contained" endIcon={<ChevronRightIcon />} onClick={() => onClick(course)}>
            Подробнее
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
