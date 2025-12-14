import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Checkbox, Text, TextInput } from "react-native-paper";
import type { RootStackParamList } from "../navigation/types";
import type { LawyerPublicProfile } from "@repo/types";
import { getLawyer, requestConsultation } from "../services/lawyersApi";

type Props = NativeStackScreenProps<RootStackParamList, "LawyerProfile">;

export function LawyerProfileScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const [lawyer, setLawyer] = useState<LawyerPublicProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [consent, setConsent] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setError(null);
    void getLawyer(id)
      .then((r) => setLawyer(r.lawyer))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "שגיאה לא צפויה"));
  }, [id]);

  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={() => navigation.goBack()} accessibilityLabel="חזרה">
        חזרה
      </Button>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      {!lawyer && !error ? <Text style={styles.loading}>טוען…</Text> : null}

      {lawyer ? (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineSmall" style={styles.name} accessibilityRole="header">
              {lawyer.displayName}
            </Text>
            <View style={styles.row}>
              {lawyer.offersFreeMonthlySlot ? <Chip>פגישה חינמית חודשית</Chip> : null}
              <Chip>{lawyer.verificationStatus === "verified" ? "מאומת/ת" : "בהמתנה"}</Chip>
            </View>
            <Text style={styles.meta}>
              {typeof lawyer.consultationFeeNIS === "number"
                ? `מחיר: ₪${lawyer.consultationFeeNIS}`
                : "מחיר: לפי תיאום"}
            </Text>
            {lawyer.bio ? <Text style={styles.bio}>{lawyer.bio}</Text> : null}

            <Text style={styles.disclaimer}>
              מגדלור אינה נותנת ייעוץ משפטי. בקשת ייעוץ (כולל הסכמה לשיתוף מינימום פרטים) תתווסף בשלב הבא.
            </Text>

            <TextInput
              mode="outlined"
              label="אימייל (אופציונלי)"
              value={contactEmail}
              onChangeText={setContactEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              mode="outlined"
              label="טלפון (אופציונלי)"
              value={contactPhone}
              onChangeText={setContactPhone}
              keyboardType="phone-pad"
            />
            <TextInput
              mode="outlined"
              label="תיאור קצר (חובה)"
              value={summary}
              onChangeText={setSummary}
              multiline
              numberOfLines={4}
            />

            <View style={styles.consentRow}>
              <Checkbox status={consent ? "checked" : "unchecked"} onPress={() => setConsent((v) => !v)} />
              <Text style={styles.consentText}>
                אני מאשר/ת לשתף את הפרטים שמילאתי עם איש/אשת המקצוע לצורך יצירת קשר בלבד.
              </Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="contained"
              disabled={!consent || summary.trim().length < 10 || submitting}
              onPress={() => {
                setSubmitting(true);
                setError(null);
                setSuccess(null);
                void requestConsultation(id, {
                  consentToShare: true,
                  contactEmail: contactEmail.trim() ? contactEmail.trim() : undefined,
                  contactPhone: contactPhone.trim() ? contactPhone.trim() : undefined,
                  summary: summary.trim(),
                })
                  .then((r) => {
                    setSuccess(r.message);
                    setContactEmail("");
                    setContactPhone("");
                    setSummary("");
                    setConsent(false);
                  })
                  .catch((e: unknown) => setError(e instanceof Error ? e.message : "שגיאה לא צפויה"))
                  .finally(() => setSubmitting(false));
              }}
            >
              {submitting ? "שולח…" : "שליחת בקשה"}
            </Button>
          </Card.Actions>
        </Card>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FAFAFA", gap: 12 },
  card: { backgroundColor: "#FFFFFF" },
  name: { fontWeight: "900", textAlign: "center" },
  row: { flexDirection: "row", gap: 8, marginTop: 10, justifyContent: "center", flexWrap: "wrap" },
  meta: { textAlign: "center", opacity: 0.8, marginTop: 10 },
  bio: { marginTop: 10, textAlign: "center" },
  disclaimer: { marginTop: 12, textAlign: "center", opacity: 0.75 },
  error: { color: "#B00020", textAlign: "center" },
  success: { color: "#0F766E", textAlign: "center" },
  loading: { textAlign: "center", opacity: 0.8 },
  consentRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  consentText: { flex: 1, opacity: 0.85 },
});


