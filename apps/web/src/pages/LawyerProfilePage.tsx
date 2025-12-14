import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import type { LawyerPublicProfile } from "@repo/types";
import { getLawyer, requestConsultation } from "../services/lawyersApi";
import { useFeatureFlagsStore } from "../state/featureFlagsStore";

export function LawyerProfilePage() {
  const enabled = useFeatureFlagsStore((s) => s.flags["lawyers.enabled"]);
  const { id } = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<LawyerPublicProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [summary, setSummary] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (!id) return;
    setError(null);
    void getLawyer(id)
      .then((r) => setLawyer(r.lawyer))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "שגיאה לא צפויה"));
  }, [enabled, id]);

  const canSubmit = useMemo(() => {
    return consent && summary.trim().length >= 10 && !submitting && Boolean(id);
  }, [consent, id, submitting, summary]);

  if (!enabled) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Alert severity="info">המודול כבוי כרגע.</Alert>
      </Container>
    );
  }

  if (!id) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Alert severity="error">מזהה פרופיל חסר.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Stack spacing={2}>
        <Button component={RouterLink} to="/lawyers" variant="outlined">
          חזרה לרשימה
        </Button>

        {error ? <Alert severity="error">{error}</Alert> : null}
        {!lawyer && !error ? <Typography>טוען…</Typography> : null}

        {lawyer ? (
          <Card variant="outlined">
            <CardContent>
              <Stack spacing={1.5}>
                <Typography variant="h5" sx={{ fontWeight: 900 }}>
                  {lawyer.displayName}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                  {lawyer.specialties.map((s) => (
                    <Chip key={s} label={s} size="small" />
                  ))}
                  {lawyer.offersFreeMonthlySlot ? (
                    <Chip label="פגישה חינמית חודשית" size="small" color="success" />
                  ) : null}
                </Stack>

                <Typography sx={{ color: "text.secondary" }}>
                  סטטוס אימות: {lawyer.verificationStatus === "verified" ? "מאומת/ת" : "בהמתנה"}
                </Typography>

                <Typography sx={{ color: "text.secondary" }}>
                  {typeof lawyer.consultationFeeNIS === "number"
                    ? `מחיר שעת ייעוץ: ₪${lawyer.consultationFeeNIS}`
                    : "מחיר: לפי תיאום"}
                </Typography>

                {lawyer.bio ? <Typography>{lawyer.bio}</Typography> : null}

                <Alert severity="info">
                  מגדלור אינה נותנת ייעוץ משפטי. בקשת ייעוץ היא פנייה לאיש/אשת מקצוע, בהסכמה מפורשת לשיתוף מינימום פרטים.
                </Alert>

                {submitMsg ? <Alert severity="success">{submitMsg}</Alert> : null}

                <Stack spacing={1.5}>
                  <TextField
                    label="אימייל ליצירת קשר (אופציונלי)"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <TextField
                    label="טלפון (אופציונלי)"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    autoComplete="tel"
                  />
                  <TextField
                    label="תיאור קצר (חובה)"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    multiline
                    minRows={3}
                    helperText="כתוב/כתבי בקצרה מה קרה ומה את/ה מבקש/ת."
                  />
                  <FormControlLabel
                    control={<Checkbox checked={consent} onChange={(_, v) => setConsent(v)} />}
                    label="אני מאשר/ת לשתף את הפרטים שמילאתי עם איש/אשת המקצוע לצורך יצירת קשר בלבד."
                  />
                  <Button
                    variant="contained"
                    disabled={!canSubmit}
                    aria-label="שליחת בקשת ייעוץ"
                    onClick={() => {
                      if (!id) return;
                      setSubmitting(true);
                      setError(null);
                      setSubmitMsg(null);
                      void requestConsultation(id, {
                        consentToShare: true,
                        contactEmail: contactEmail.trim() ? contactEmail.trim() : undefined,
                        contactPhone: contactPhone.trim() ? contactPhone.trim() : undefined,
                        summary: summary.trim(),
                      })
                        .then((r) => {
                          setSubmitMsg(r.message);
                          setSummary("");
                          setContactEmail("");
                          setContactPhone("");
                          setConsent(false);
                        })
                        .catch((e: unknown) => setError(e instanceof Error ? e.message : "שגיאה לא צפויה"))
                        .finally(() => setSubmitting(false));
                    }}
                  >
                    {submitting ? "שולח…" : "שליחת בקשה"}
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ) : null}
      </Stack>
    </Container>
  );
}


