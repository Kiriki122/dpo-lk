import type { AppPath } from "@/shared/config/routes";

export type SidebarLink = {
  text: string;
  path: AppPath;
  icon: React.ComponentType;
};
