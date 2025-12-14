import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import { spacing } from "@civio/design-tokens";
import type { SituationId } from "./types";

const OPTIONS: ReadonlyArray<{ id: SituationId; label: string }> = [
  { id: "unemployment", label: "אבטלה" },
  { id: "disability", label: "נכות / מצב רפואי" },
  { id: "debt", label: "חוב / בעיה מול רשות" },
  { id: "financial-support", label: "סיוע כלכלי" },
  { id: "unsure", label: "לא בטוחה" },
] as const;

export function StepSituation(props: { onSelect: (id: SituationId) => void }) {
  return (
    <View style={{ padding: spacing.lg, gap: spacing.md }}>
      <Text variant="titleLarge" accessibilityRole="header">
        מה הסיבה שבגללה פנית אלינו?
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


