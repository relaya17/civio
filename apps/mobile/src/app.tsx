import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { I18nManager, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./navigation/types";
import { HomeScreen } from "./screens/HomeScreen";
import { WizardScreen } from "./screens/WizardScreen";
import { ResultsScreen } from "./screens/Wizard/ResultsScreen";
import { LawyersScreen } from "./screens/LawyersScreen";
import { LawyerProfileScreen } from "./screens/LawyerProfileScreen";
import { LettersScreen } from "./screens/LettersScreen";
import { AppProvider } from "./providers/AppProvider";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function App() {
  useEffect(() => {
    // MVP: keep RTL enabled. Full RTL forcing usually requires a reload.
    I18nManager.allowRTL(true);
    if (Platform.OS === "android") {
      I18nManager.forceRTL(true);
    }
  }, []);

  return (
    <AppProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Wizard" component={WizardScreen} />
          <Stack.Screen name="WizardResults" component={ResultsScreen} />
          <Stack.Screen name="Lawyers" component={LawyersScreen} />
          <Stack.Screen name="LawyerProfile" component={LawyerProfileScreen} />
          <Stack.Screen name="Letters" component={LettersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}


