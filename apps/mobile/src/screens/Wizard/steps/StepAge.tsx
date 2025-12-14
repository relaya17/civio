import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { spacing } from "@civio/design-tokens";
import type { AgeRangeId } from "./types";

const OPTIONS: ReadonlyArray<{ id: AgeRangeId; label: string }> = [
  { id: "under-18", label: "מתחת ל־18" },
  { id: "18-25", label: "18–25" },
  { id: "26-60", label: "26–60" },
  { id: "over-60", label: "מעל 60" },
  { id: "unsure", label: "לא בטוחה" },
] as const;

export function StepAge(props: { onSelect: (id: AgeRangeId) => void }) {
  return (
    <View style={{ padding: spacing.lg, gap: spacing.md }}>
      <Text variant="titleLarge" accessibilityRole="header">
        באיזה טווח גילאים את נמצאת?
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


