import { createTheme } from "@mui/material/styles";
import { civioTokens } from "@repo/theme";

export function createCivioMuiTheme(options: { direction: "rtl" | "ltr" }) {
  return createTheme({
    direction: options.direction,
    palette: {
      mode: "light",
      // UI chrome (Navbar/Footer) is petrol; keep buttons aligned with it by using petrol as `primary`.
      primary: {
        main: civioTokens.colors.secondaryDark,
        dark: civioTokens.colors.secondaryDark,
        light: civioTokens.colors.secondary,
      },
      // Keep the original deep-blue as `secondary` for optional use (links, accents, etc.)
      secondary: { main: civioTokens.colors.primary, dark: civioTokens.colors.primaryDark },
      success: { main: civioTokens.colors.success },
      warning: { main: civioTokens.colors.warning },
      error: { main: civioTokens.colors.error },
      info: { main: civioTokens.colors.info },
      divider: civioTokens.colors.divider,
      background: { default: civioTokens.colors.background, paper: civioTokens.colors.surface },
      text: { primary: civioTokens.colors.text, secondary: civioTokens.colors.textSecondary, disabled: civioTokens.colors.textDisabled },
    },
    shape: { borderRadius: civioTokens.roundness },
    typography: {
      fontFamily: '"Assistant","Inter",system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
      h1: { fontSize: "2rem", fontWeight: 700, letterSpacing: "-0.02em" },
      h2: { fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.01em" },
      body1: { fontSize: "1rem", fontWeight: 400 },
      body2: { fontSize: "0.875rem", fontWeight: 400 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: "contained",
        },
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: "saturate(180%) blur(10px)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          ":focus-visible": {
            outline: `3px solid ${civioTokens.colors.focus}`,
            outlineOffset: 2,
          },
        },
      },
    },
  });
}


