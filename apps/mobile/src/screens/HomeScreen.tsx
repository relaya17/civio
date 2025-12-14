import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import type { RootStackParamList } from "../navigation/types";
import { FloatingButton } from "../components/FloatingButton";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text variant="displaySmall" style={styles.title} accessibilityRole="header">
        מגדלור
      </Text>
      <Text variant="titleMedium" style={styles.slogan}>
        אור ומדריך בדרך לזכויות
      </Text>
      <Text style={styles.disclaimer}>
        מגדלור מספקת מידע כללי בלבד ואינה מהווה ייעוץ משפטי.
      </Text>

      <Button
        mode="contained"
        onPress={() => navigation.navigate("Wizard")}
        accessibilityLabel="התחלת שאלון"
        style={styles.primaryCta}
      >
        התחלת שאלון
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Lawyers")}
        accessibilityLabel="מעבר לרשימת עורכי דין"
        style={styles.secondaryCta}
      >
        עו״ד/יועץ (פיילוט)
      </Button>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate("Letters")}
        accessibilityLabel="מעבר למחולל מכתבים"
        style={styles.secondaryCta}
      >
        מחולל מכתבים (חינם)
      </Button>

      <FloatingButton onPress={() => navigation.navigate("Wizard")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontWeight: "900",
    textAlign: "center",
  },
  slogan: {
    marginTop: 12,
    textAlign: "center",
  },
  disclaimer: {
    marginTop: 10,
    textAlign: "center",
    opacity: 0.7,
  },
  primaryCta: {
    marginTop: 22,
    alignSelf: "center",
  },
  secondaryCta: {
    marginTop: 12,
    alignSelf: "center",
  },
});


