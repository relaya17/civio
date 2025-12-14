import { MD3LightTheme } from "react-native-paper";
import { colors } from "@civio/design-tokens";

export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
  },
} as const;


