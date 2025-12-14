import type { PropsWithChildren } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { createCivioMuiTheme } from "../theme/createCivioMuiTheme";
import "../i18n/i18n";

const theme = createCivioMuiTheme({ direction: "rtl" });

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </BrowserRouter>
  );
}


