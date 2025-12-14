import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { colors, spacing } from "@civio/design-tokens";
import type { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "WizardResults">;

function statusCopy(status: "possible" | "uncertain" | "none") {
  if (status === "possible") {
    return {
      title: "יש סיכוי טוב לזכאות",
      body: "לפי המידע שסיפקת, ייתכן ויש זכויות רלוונטיות. מומלץ להמשיך לבדיקת עומק ולשמור תיעוד.",
    };
  }
  if (status === "uncertain") {
    return {
      title: "דורש בדיקה נוספת",
      body: "ייתכן ויש זכויות רלוונטיות, אבל חסר לנו מידע. אפשר להמשיך לשלב מתקדם או להתייעץ עם גורם מקצועי.",
    };
  }
  return {
    title: "לא נמצאה זכאות כרגע",
    body: "לפי מה שסיפקת, לא נמצאה זכאות בשלב זה. לפעמים שינוי קטן בפרטים משנה את התוצאה—שווה לבדוק שוב או להתייעץ.",
  };
}

export function ResultsScreen({ navigation, route }: Props) {
  const { status } = route.params;
  const copy = statusCopy(status);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, padding: spacing.lg, justifyContent: "center" }}>
      <Card>
        <Card.Content>
          <Text variant="titleLarge" accessibilityRole="header">
            תוצאות הבדיקה
          </Text>
          <Text variant="titleMedium" style={{ marginTop: spacing.md }}>
            {copy.title}
          </Text>
          <Text style={{ marginTop: spacing.sm, color: colors.textSecondary, lineHeight: 22 }}>{copy.body}</Text>
          <Text style={{ marginTop: spacing.md, color: colors.textSecondary }}>
            חשוב: זו הכוונה כללית בלבד ולא ייעוץ משפטי.
          </Text>
        </Card.Content>

        <Card.Actions style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.md }}>
          <Button mode="contained" onPress={() => navigation.navigate("Lawyers")} accessibilityLabel="פנייה לעורך דין">
            פנייה לעו״ד
          </Button>
          <Button mode="text" onPress={() => navigation.navigate("Home")} accessibilityLabel="חזרה לבית">
            חזרה לבית
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}


