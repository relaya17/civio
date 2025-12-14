import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import type { LawyerPublicProfile } from "@repo/types";
import { listLawyers, registerLawyer } from "../services/lawyersApi";
import { useFeatureFlagsStore } from "../state/featureFlagsStore";

function specialtyLabel(value: string) {
  switch (value) {
    case "labor":
      return "דיני עבודה";
    case "national-insurance":
      return "ביטוח לאומי";
    case "health":
      return "בריאות";
    case "housing":
      return "דיור";
    case "family":
      return "משפחה";
    case "immigration":
      return "הגירה/אזרחות";
    default:
      return "אחר";
  }
}

export function LawyersPage() {
  const enabled = useFeatureFlagsStore((s) => s.flags["lawyers.enabled"]);
  const [items, setItems] = useState<LawyerPublicProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [freeOnly, setFreeOnly] = useState(false);

  // Minimal “professional signup” form (pilot)
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    setLoading(true);
    setError(null);
    void listLawyers({ freeOnly })
      .then((r) => setItems(r.items))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "שגיאה לא צפויה"))
      .finally(() => setLoading(false));
  }, [enabled, freeOnly]);

  const canSubmit = useMemo(() => {
    return displayName.trim().length >= 2 && email.includes("@") && licenseNumber.trim().length >= 3;
  }, [displayName, email, licenseNumber]);

  if (!enabled) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Alert severity="info">המודול כבוי כרגע (Feature Flag).</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            חיבור לעו״ד / יועץ (פיילוט)
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 1 }}>
            מגדלור לא מספקת ייעוץ משפטי. כאן מדובר בחיבור לאנשי מקצוע—בהסכמת שני הצדדים.
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 800 }}>רשימת אנשי מקצוע</Typography>
              <FormControlLabel
                control={<Switch checked={freeOnly} onChange={(_, v) => setFreeOnly(v)} />}
                label="הצג רק מי שמציע/ה פגישה חודשית חינמית"
              />

              {loading ? <Typography>טוען…</Typography> : null}
              {error ? <Alert severity="error">{error}</Alert> : null}
              {!loading && !error && items.length === 0 ? (
                <Alert severity="info">עדיין אין אנשי מקצוע רשומים בפיילוט.</Alert>
              ) : null}

              <Stack spacing={2}>
                {items.map((l) => (
                  <Card key={l.id} variant="outlined">
                    <CardContent>
                      <Stack spacing={1}>
                        <Typography sx={{ fontWeight: 800 }}>{l.displayName}</Typography>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                          {l.specialties.map((s) => (
                            <Chip key={s} label={specialtyLabel(s)} size="small" />
                          ))}
                          {l.offersFreeMonthlySlot ? <Chip label="פגישה חינמית חודשית" size="small" color="success" /> : null}
                          <Chip
                            label={l.verificationStatus === "verified" ? "מאומת/ת" : "בהמתנה לאימות"}
                            size="small"
                            variant="outlined"
                          />
                        </Stack>
                        <Typography sx={{ color: "text.secondary" }}>
                          {typeof l.consultationFeeNIS === "number"
                            ? `מחיר: ₪${l.consultationFeeNIS}`
                            : "מחיר: לפי תיאום"}
                        </Typography>
                        <Button component={RouterLink} to={`/lawyers/${l.id}`} variant="outlined">
                          צפייה בפרופיל
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Divider />

        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography sx={{ fontWeight: 800 }}>הרשמה מקצועית (פיילוט)</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                אנחנו מבקשים מינימום מידע כדי לפתוח פרופיל. אימות מקצועי יתווסף בשלב הבא.
              </Typography>

              {notice ? <Alert severity="success">{notice}</Alert> : null}

              <TextField label="שם לתצוגה" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              <TextField label="אימייל" value={email} onChange={(e) => setEmail(e.target.value)} />
              <TextField
                label="מספר רישיון / מזהה מקצועי"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />

              <Button
                disabled={!canSubmit}
                onClick={() => {
                  setNotice(null);
                  void registerLawyer({
                    displayName,
                    email,
                    licenseNumber,
                    specialties: ["labor"],
                    offersFreeMonthlySlot: true,
                    consultationFeeNIS: null,
                  })
                    .then((r) => {
                      setNotice(r.notice);
                      setDisplayName("");
                      setEmail("");
                      setLicenseNumber("");
                      return listLawyers({ freeOnly });
                    })
                    .then((r) => setItems(r.items))
                    .catch((e: unknown) => setError(e instanceof Error ? e.message : "שגיאה לא צפויה"));
                }}
              >
                שליחת בקשה
              </Button>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                הערה משפטית: מגדלור אינה צד להסכם הייעוץ ואינה אחראית לתוצאות הייעוץ. כל התקשרות היא בין המשתמש לבין איש/אשת המקצוע.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}


