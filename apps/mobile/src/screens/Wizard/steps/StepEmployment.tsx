import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { spacing } from "@civio/design-tokens";
import type { EmploymentStatusId } from "./types";

const OPTIONS: ReadonlyArray<{ id: EmploymentStatusId; label: string }> = [
  { id: "not-working", label: "לא עובדת" },
  { id: "part-time", label: "עובדת חלקית" },
  { id: "working", label: "עובדת" },
  { id: "unsure", label: "לא בטוחה" },
] as const;

export function StepEmployment(props: { onSelect: (id: EmploymentStatusId) => void }) {
  return (
    <View style={{ padding: spacing.lg, gap: spacing.md }}>
      <Text variant="titleLarge" accessibilityRole="header">
        מה מתאר הכי טוב את המצב שלך כרגע?
      </Text>

      <View style={{ gap: spacing.sm }}>
        {OPTIONS.map((o) => (
          <Card
            key={o.id}
            onPress={() => props.onSelect(o.id)}
            accessibilityRole="button"
            accessibilityLabel={`בחירה: ${o.label}`}
          >
            <Card.Content>
              <Text variant="titleMedium">{o.label}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );
}


