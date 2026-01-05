import { Box, CircularProgress } from "@mui/material";

export const PageLoader = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100dvh" }}>
    <CircularProgress size={80} />
  </Box>
);
