import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { QueryProvider } from "./providers/query";
import { AppRouter } from "./providers/router";

import "./index.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#274193",
    },
    secondary: {
      main: "#950A2A",
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </ThemeProvider>
  );
}
