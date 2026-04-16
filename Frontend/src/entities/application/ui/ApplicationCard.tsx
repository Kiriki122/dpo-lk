import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Chip, Typography } from "@mui/material";

import type { Application } from "../model/types";

interface ApplicationCardProps {
  application: Application;
  onClick: (course: Application) => void;
}

export const ApplicationCard = ({ application, onClick }: ApplicationCardProps) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }} raised>
      <CardActionArea
        onClick={() => onClick(application)}
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
            {application.courseName}
          </Typography>
          <Box sx={{ flex: 1 }} />

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
            <Chip icon={<AccessTimeIcon />} label={`${application.status}`} />
            <Chip icon={<CalendarTodayIcon />} label={`${application.date.toLocaleDateString("ru-RU")}`} />
          </Box>
        </CardContent>

        <CardActions>
          <Button
            component="div"
            variant="contained"
            endIcon={<ChevronRightIcon />}
            fullWidth
            onClick={() => onClick(application)}
          >
            Подробнее
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
