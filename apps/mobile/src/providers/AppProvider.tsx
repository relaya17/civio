import type { PropsWithChildren } from "react";
import { PaperProvider } from "react-native-paper";
import { paperTheme } from "../theme/paperTheme";

export function AppProvider({ children }: PropsWithChildren) {
  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
}


