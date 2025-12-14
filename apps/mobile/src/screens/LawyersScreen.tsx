import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button, Card, Chip, Text } from "react-native-paper";
import type { RootStackParamList } from "../navigation/types";
import type { LawyerPublicProfile } from "@repo/types";
import { listLawyers } from "../services/lawyersApi";

type Props = NativeStackScreenProps<RootStackParamList, "Lawyers">;

export function LawyersScreen({ navigation }: Props) {
  const [items, setItems] = useState<LawyerPublicProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
    void listLawyers()
      .then((r) => setItems(r.items))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "שגיאה לא צפויה"));
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.title} accessibilityRole="header">
        עו״ד/יועץ (פיילוט)
      </Text>
      <Text style={styles.subtitle}>
        מגדלור לא מספקת ייעוץ משפטי. כאן מדובר בחיבור לאנשי מקצוע.
      </Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <FlatList
        data={items}
        keyExtractor={(x) => x.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text variant="titleMedium" style={styles.name}>
                {item.displayName}
              </Text>
              <View style={styles.row}>
                {item.offersFreeMonthlySlot ? <Chip>פגישה חינמית חודשית</Chip> : null}
                <Chip>{item.verificationStatus === "verified" ? "מאומת/ת" : "בהמתנה"}</Chip>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => navigation.navigate("LawyerProfile", { id: item.id })}>
                פרופיל
              </Button>
            </Card.Actions>
          </Card>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>עדיין אין אנשי מקצוע רשומים בפיילוט.</Text>
        }
      />

      <Button mode="outlined" onPress={() => navigation.goBack()} accessibilityLabel="חזרה">
        חזרה
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FAFAFA" },
  title: { textAlign: "center", fontWeight: "800", marginTop: 10 },
  subtitle: { textAlign: "center", opacity: 0.75, marginTop: 8, marginBottom: 10 },
  error: { color: "#B00020", textAlign: "center", marginBottom: 8 },
  list: { paddingBottom: 12, gap: 10 },
  card: { backgroundColor: "#FFFFFF" },
  name: { fontWeight: "800" },
  row: { flexDirection: "row", gap: 8, marginTop: 8, flexWrap: "wrap" },
  empty: { textAlign: "center", opacity: 0.75, marginTop: 18 },
});


