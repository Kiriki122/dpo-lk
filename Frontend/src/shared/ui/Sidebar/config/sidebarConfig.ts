import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DescriptionIcon from "@mui/icons-material/Description";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import SchoolIcon from "@mui/icons-material/School";

import { pathKeys } from "@/shared/config/routes";

import type { SidebarLink } from "../model/types";

export const sidebarLinks: SidebarLink[] = [
  { text: "Курсы", path: pathKeys.courses, icon: SchoolIcon },
  { text: "Запись на курс", path: pathKeys.enroll.root, icon: PlaylistAddCheckIcon },
  { text: "Документы", path: pathKeys.documents, icon: DescriptionIcon },
  { text: "Расписание", path: pathKeys.schedule, icon: CalendarMonthIcon },
];
