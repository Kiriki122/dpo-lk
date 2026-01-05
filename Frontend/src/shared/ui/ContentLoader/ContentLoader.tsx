import { Box, CircularProgress } from "@mui/material";

export const ContentLoader = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      minHeight: "50dvh",
    }}
  >
    <CircularProgress />
  </Box>
);
