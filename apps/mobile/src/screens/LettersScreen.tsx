import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import { Share, StyleSheet, View } from "react-native";
import { Button, Card, Chip, Switch, Text, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { RootStackParamList } from "../navigation/types";
import type { LetterAuthorityId, LetterKindId, LetterComposerInput } from "@repo/types";
import { generateLetter, getLetterPresets, getLetterSuggestions } from "@repo/logic";

type Props = NativeStackScreenProps<RootStackParamList, "Letters">;

export function LettersScreen({ navigation }: Props) {
  const [authorityId, setAuthorityId] = useState<LetterAuthorityId>("state-comptroller");
  const [kindId, setKindId] = useState<LetterKindId>("complaint");
  const [guidedMode, setGuidedMode] = useState(true);
  const [step, setStep] = useState(0);
  const [simpleMode, setSimpleMode] = useState(true);

  const [fullName, setFullName] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [facts, setFacts] = useState("");
  const [request, setRequest] = useState("");

  const [draftFound, setDraftFound] = useState<{ savedAt: number; json: string } | null>(null);
  const DRAFT_KEY = "civio.letters.draft.mobile.v1";

  type DraftV1 = {
    readonly v: 1;
    readonly savedAt: number;
    readonly data: {
      readonly guidedMode: boolean;
      readonly step: number;
      readonly simpleMode: boolean;
      readonly authorityId: LetterAuthorityId;
      readonly kindId: LetterKindId;
      readonly fullName: string;
      readonly caseNumber: string;
      readonly subject: string;
      readonly facts: string;
      readonly request: string;
    };
  };

  function isDraftV1(x: unknown): x is DraftV1 {
    if (!x || typeof x !== "object") return false;
    const o = x as Record<string, unknown>;
    if (o["v"] !== 1) return false;
    if (typeof o["savedAt"] !== "number") return false;
    const d = o["data"];
    if (!d || typeof d !== "object") return false;
    const data = d as Record<string, unknown>;
    const str = (k: string) => typeof data[k] === "string";
    return (
      typeof data["guidedMode"] === "boolean" &&
      typeof data["step"] === "number" &&
      typeof data["simpleMode"] === "boolean" &&
      str("authorityId") &&
      str("kindId") &&
      str("fullName") &&
      str("caseNumber") &&
      str("subject") &&
      str("facts") &&
      str("request")
    );
  }

  function hasMeaningfulData(d: DraftV1["data"]) {
    return d.fullName.trim().length > 0 || d.subject.trim().length > 0 || d.facts.trim().length > 0 || d.request.trim().length > 0;
  }

  useEffect(() => {
    let active = true;
    void AsyncStorage.getItem(DRAFT_KEY)
      .then((raw) => {
        if (!active) return;
        if (!raw) return;
        const parsed: unknown = JSON.parse(raw);
        if (!isDraftV1(parsed)) return;
        if (!hasMeaningfulData(parsed.data)) return;
        setDraftFound({ savedAt: parsed.savedAt, json: raw });
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const draft: DraftV1 = {
      v: 1,
      savedAt: Date.now(),
      data: {
        guidedMode,
        step,
        simpleMode,
        authorityId,
        kindId,
        fullName,
        caseNumber,
        subject,
        facts,
        request,
      },
    };

    if (!hasMeaningfulData(draft.data)) return;

    const t = setTimeout(() => {
      void AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(draft)).catch(() => undefined);
    }, 600);

    return () => clearTimeout(t);
  }, [authorityId, caseNumber, facts, fullName, guidedMode, kindId, request, simpleMode, step, subject]);

  const canGenerate = fullName.trim().length >= 2 && subject.trim().length >= 4 && facts.trim().length >= 10 && request.trim().length >= 6;

  const steps = useMemo(() => ["רשות וסוג", "תרחיש", "פרטים", "תוכן", "שיתוף"], []);

  const canNext = useMemo(() => {
    if (!guidedMode) return true;
    if (step === 0) return true;
    if (step === 1) return true;
    if (step === 2) return fullName.trim().length >= 2;
    if (step === 3) return subject.trim().length >= 4 && facts.trim().length >= 10 && request.trim().length >= 6;
    return true;
  }, [facts, fullName, guidedMode, request, step, subject]);

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const suggestions = useMemo(() => getLetterSuggestions({ authorityId, kindId }), [authorityId, kindId]);
  const factsSuggestions = useMemo(() => suggestions.filter((s) => s.target === "facts"), [suggestions]);
  const requestSuggestions = useMemo(() => suggestions.filter((s) => s.target === "request"), [suggestions]);
  const presets = useMemo(() => getLetterPresets({ authorityId, kindId }), [authorityId, kindId]);

  function appendText(current: string, snippet: string) {
    const trimmed = current.trim();
    if (!trimmed) return snippet;
    if (trimmed.endsWith("\n")) return `${trimmed}${snippet}`;
    return `${trimmed}\n${snippet}`;
  }

  const letterText = useMemo(() => {
    if (!canGenerate) return null;
    const input: LetterComposerInput = {
      authorityId,
      kindId,
      fullName: fullName.trim(),
      caseNumber: caseNumber.trim() ? caseNumber.trim() : undefined,
      subject: subject.trim(),
      facts: facts.trim(),
      request: request.trim(),
      dateISO: new Date().toISOString().slice(0, 10),
    };
    const out = generateLetter(input);
    return `${out.bodyText}\n\n${out.disclaimer}`;
  }, [authorityId, canGenerate, facts, fullName, kindId, request, subject]);

  return (
    <View style={styles.container}>
      <Button mode="outlined" onPress={() => navigation.goBack()}>
        חזרה
      </Button>

      <Text variant="headlineSmall" style={styles.title} accessibilityRole="header">
        מחולל מכתבים (חינם)
      </Text>
      <Text style={styles.subtitle}>אין שליחה מתוך המערכת. אפשר לשתף/להעתיק טקסט.</Text>

      {draftFound ? (
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Text style={styles.section}>נמצאה טיוטה שנשמרה במכשיר</Text>
            <Text style={styles.subtitle}>רוצה לשחזר?</Text>
            <View style={styles.navRow}>
              <Button
                mode="contained"
                onPress={() => {
                  try {
                    const parsed: unknown = JSON.parse(draftFound.json);
                    if (!isDraftV1(parsed)) return;
                    const d = parsed.data;
                    setGuidedMode(d.guidedMode);
                    setStep(d.step);
                    setSimpleMode(d.simpleMode);
                    setAuthorityId(d.authorityId);
                    setKindId(d.kindId);
                    setFullName(d.fullName);
                    setCaseNumber(d.caseNumber);
                    setSubject(d.subject);
                    setFacts(d.facts);
                    setRequest(d.request);
                    setDraftFound(null);
                  } catch {
                    // ignore
                  }
                }}
              >
                שחזור
              </Button>
              <Button
                mode="outlined"
                onPress={() => {
                  void AsyncStorage.removeItem(DRAFT_KEY).catch(() => undefined);
                  setDraftFound(null);
                }}
              >
                מחיקה
              </Button>
              <Button mode="text" onPress={() => setDraftFound(null)}>
                לא עכשיו
              </Button>
            </View>
          </Card.Content>
        </Card>
      ) : null}

      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Text style={styles.section}>מצב עבודה</Text>
          <View style={styles.toggleRow}>
            <Text>{guidedMode ? "מודרך (שלבים)" : "חופשי (טופס מלא)"}</Text>
            <Switch
              value={guidedMode}
              onValueChange={(v) => {
                setGuidedMode(v);
                setStep(0);
              }}
            />
          </View>
          {guidedMode ? (
            <>
              <Text style={styles.subtitle}>{`שלב ${step + 1} מתוך ${steps.length}: ${steps[step]}`}</Text>
              <View style={styles.navRow}>
                <Button mode="outlined" onPress={back} disabled={step === 0}>
                  חזרה
                </Button>
                <Button mode="contained" onPress={next} disabled={!canNext || step === steps.length - 1}>
                  המשך
                </Button>
              </View>
            </>
          ) : null}

          <Text style={styles.section}>בחירה מהירה</Text>
          <View style={styles.toggleRow}>
            <Text>מצב שפה פשוטה</Text>
            <Switch value={simpleMode} onValueChange={setSimpleMode} />
          </View>
          {guidedMode ? (
            step === 0 ? (
              <>
                <View style={styles.row}>
                  <Button
                    mode={authorityId === "state-comptroller" ? "contained" : "outlined"}
                    onPress={() => setAuthorityId("state-comptroller")}
                  >
                    מבקר המדינה
                  </Button>
                  <Button mode={authorityId === "welfare-bureau" ? "contained" : "outlined"} onPress={() => setAuthorityId("welfare-bureau")}>
                    רווחה
                  </Button>
                  <Button
                    mode={authorityId === "housing-ministry" ? "contained" : "outlined"}
                    onPress={() => setAuthorityId("housing-ministry")}
                  >
                    שיכון
                  </Button>
                  <Button
                    mode={authorityId === "national-insurance" ? "contained" : "outlined"}
                    onPress={() => setAuthorityId("national-insurance")}
                  >
                    ביטוח לאומי
                  </Button>
                  <Button mode={authorityId === "health-fund" ? "contained" : "outlined"} onPress={() => setAuthorityId("health-fund")}>
                    קופת חולים
                  </Button>
                  <Button mode={authorityId === "municipality" ? "contained" : "outlined"} onPress={() => setAuthorityId("municipality")}>
                    עירייה
                  </Button>
                </View>

                <View style={styles.row}>
                  <Button mode={kindId === "complaint" ? "contained" : "outlined"} onPress={() => setKindId("complaint")}>
                    תלונה
                  </Button>
                  <Button mode={kindId === "request-info" ? "contained" : "outlined"} onPress={() => setKindId("request-info")}>
                    מידע
                  </Button>
                  <Button mode={kindId === "request-meeting" ? "contained" : "outlined"} onPress={() => setKindId("request-meeting")}>
                    פגישה
                  </Button>
                  <Button mode={kindId === "appeal-objection" ? "contained" : "outlined"} onPress={() => setKindId("appeal-objection")}>
                    השגה
                  </Button>
                  <Button mode={kindId === "request-documents" ? "contained" : "outlined"} onPress={() => setKindId("request-documents")}>
                    מסמכים
                  </Button>
                </View>
                <Text style={styles.subtitle}>לחצי "המשך" כדי לבחור תרחיש (אופציונלי).</Text>
              </>
            ) : null
          ) : (
            <>
              <View style={styles.row}>
                <Button mode={authorityId === "state-comptroller" ? "contained" : "outlined"} onPress={() => setAuthorityId("state-comptroller")}>
                  מבקר המדינה
                </Button>
                <Button mode={authorityId === "welfare-bureau" ? "contained" : "outlined"} onPress={() => setAuthorityId("welfare-bureau")}>
                  רווחה
                </Button>
                <Button mode={authorityId === "housing-ministry" ? "contained" : "outlined"} onPress={() => setAuthorityId("housing-ministry")}>
                  שיכון
                </Button>
                <Button mode={authorityId === "national-insurance" ? "contained" : "outlined"} onPress={() => setAuthorityId("national-insurance")}>
                  ביטוח לאומי
                </Button>
                <Button mode={authorityId === "health-fund" ? "contained" : "outlined"} onPress={() => setAuthorityId("health-fund")}>
                  קופת חולים
                </Button>
                <Button mode={authorityId === "municipality" ? "contained" : "outlined"} onPress={() => setAuthorityId("municipality")}>
                  עירייה
                </Button>
              </View>

              <View style={styles.row}>
                <Button mode={kindId === "complaint" ? "contained" : "outlined"} onPress={() => setKindId("complaint")}>
                  תלונה
                </Button>
                <Button mode={kindId === "request-info" ? "contained" : "outlined"} onPress={() => setKindId("request-info")}>
                  מידע
                </Button>
                <Button mode={kindId === "request-meeting" ? "contained" : "outlined"} onPress={() => setKindId("request-meeting")}>
                  פגישה
                </Button>
                <Button mode={kindId === "appeal-objection" ? "contained" : "outlined"} onPress={() => setKindId("appeal-objection")}>
                  השגה
                </Button>
                <Button mode={kindId === "request-documents" ? "contained" : "outlined"} onPress={() => setKindId("request-documents")}>
                  מסמכים
                </Button>
              </View>
            </>
          )}

          {guidedMode && step === 1 ? (
            <>
              <Text style={styles.section}>תרחיש מוכן (אופציונלי)</Text>
              <View style={styles.row}>
                <Chip
                  onPress={() => {
                    setSubject("");
                    setFacts("");
                    setRequest("");
                    next();
                  }}
                >
                  ללא תרחיש
                </Chip>
                {presets.map((p) => (
                  <Chip
                    key={p.id}
                    onPress={() => {
                      setSubject(p.subject);
                      setFacts(p.facts);
                      setRequest(p.request);
                      next();
                    }}
                  >
                    {p.label}
                  </Chip>
                ))}
              </View>
              {presets.length === 0 ? <Text style={styles.subtitle}>אין תרחיש מוכן לבחירה הזו — לחצי "המשך".</Text> : null}
            </>
          ) : null}

          {!guidedMode || step === 2 ? (
            <>
              <Text style={styles.section}>פרטי פונה</Text>
              <TextInput mode="outlined" label="שם מלא (חובה)" value={fullName} onChangeText={setFullName} />
              <TextInput mode="outlined" label="מס׳ תיק/פנייה (אופציונלי)" value={caseNumber} onChangeText={setCaseNumber} />
            </>
          ) : null}

          {!guidedMode || step === 3 ? (
            <>
              <Text style={styles.section}>תוכן</Text>
              <TextInput mode="outlined" label="נושא (חובה)" value={subject} onChangeText={setSubject} />

          {simpleMode ? (
            <>
              {presets.length > 0 ? (
                <>
                  <Text style={styles.sectionSmall}>תבניות מוכנות (ממלאות את המכתב)</Text>
                  <View style={styles.row}>
                    {presets.map((p) => (
                      <Chip
                        key={p.id}
                        onPress={() => {
                          setSubject(p.subject);
                          setFacts(p.facts);
                          setRequest(p.request);
                        }}
                      >
                        {p.label}
                      </Chip>
                    ))}
                  </View>
                </>
              ) : null}

              <Text style={styles.sectionSmall}>משפטים מוכנים ל״מה קרה״</Text>
              <View style={styles.row}>
                {factsSuggestions.map((s) => (
                  <Chip key={s.id} onPress={() => setFacts((v) => appendText(v, s.text))}>
                    {s.label}
                  </Chip>
                ))}
              </View>

              <Text style={styles.sectionSmall}>משפטים מוכנים ל״מה מבקשים״</Text>
              <View style={styles.row}>
                {requestSuggestions.map((s) => (
                  <Chip key={s.id} onPress={() => setRequest((v) => appendText(v, s.text))}>
                    {s.label}
                  </Chip>
                ))}
              </View>
            </>
          ) : null}

          <TextInput mode="outlined" label="מה קרה? (חובה)" value={facts} onChangeText={setFacts} multiline numberOfLines={4} />
          <TextInput mode="outlined" label="מה מבקשים? (חובה)" value={request} onChangeText={setRequest} multiline numberOfLines={3} />
            </>
          ) : null}

          <Button
            mode="contained"
            disabled={!letterText}
            onPress={() => {
              if (!letterText) return;
              void Share.share({ message: letterText });
            }}
          >
            שיתוף / העתקה
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#FAFAFA", gap: 12 },
  title: { textAlign: "center", fontWeight: "900" },
  subtitle: { textAlign: "center", opacity: 0.75 },
  card: { backgroundColor: "#FFFFFF" },
  content: { gap: 10 },
  row: { flexDirection: "row", gap: 8, flexWrap: "wrap", justifyContent: "center" },
  section: { fontWeight: "800", textAlign: "center", marginTop: 4 },
  sectionSmall: { fontWeight: "700", textAlign: "center", marginTop: 2, opacity: 0.85 },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  navRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
});


