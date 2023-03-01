import { ThemeProvider, CssBaseline } from "@mui/material";
import { colorsTheme } from "./";
export const ThemeApp = ({ children }) => {
  return (
    <ThemeProvider theme={colorsTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
