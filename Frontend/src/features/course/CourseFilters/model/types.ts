export const SORT_OPTIONS = {
  NAME_ASC: "NAME_ASC",
  NAME_DESC: "NAME_DESC",
  HOURS_ASC: "HOURS_ASC",
  HOURS_DESC: "HOURS_DESC",
} as const;

export type SortOption = keyof typeof SORT_OPTIONS;
