import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Card, CardActionArea, CardContent, Box, Typography, Chip, Button, CardActions } from "@mui/material";

import type { Course } from "../model/types";

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard = ({ course, onClick }: CourseCardProps) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }} raised>
      <CardActionArea
        onClick={() => onClick(course)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "stretch",
          alignItems: "stretch",
          flexGrow: 1,
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
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
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            <Chip icon={<AccessTimeIcon />} label={`${course.hours} ак.ч`} />
          </Box>
        </CardContent>

        <CardActions>
          <Button
            component="div"
            variant="contained"
            endIcon={<ChevronRightIcon />}
            fullWidth
            onClick={() => onClick(course)}
          >
            Подробнее
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
