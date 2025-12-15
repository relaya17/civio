import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  FormControl,
  Step,
  StepLabel,
  Stepper,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import type {
  GeneratedLetter,
  LetterAuthorityId,
  LetterComposerInput,
  LetterKindId,
  LetterSituation,
  LetterTone,
  LetterUrgency,
} from "@repo/types";
import {
  LETTER_AUTHORITIES,
  LETTER_KINDS,
  generateLetter,
  getLetterSuggestions,
  getLetterPresets,
  LEGAL_SOFT_PHRASES,
} from "@repo/logic";
import { useFeatureFlagsStore } from "../state/featureFlagsStore";
import { useUserPreferencesStore } from "../state/userPreferencesStore";
import { useSavedLettersStore } from "../state/savedLettersStore";
import { OnboardingDialog } from "../app/components/OnboardingDialog";
import { improveText, isAIAvailable } from "../services/aiImprovement";
import { HelpTooltip } from "../components/HelpTooltip";
import { EmergencyInfo } from "../components/EmergencyInfo";
import { LetterEditor } from "../components/LetterEditor";
import { LetterPreview } from "../components/LetterPreview";
import { AuthorityInfoCard } from "../components/AuthorityInfoCard";

const DRAFT_KEY = "civio.letters.draft.web.v1";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function LettersPage() {
  const navigate = useNavigate();
  const enabled = useFeatureFlagsStore((s) => s.flags["letters.enabled"]);
  const preferences = useUserPreferencesStore((s) => s.preferences);
  const updatePreferences = useUserPreferencesStore((s) => s.updatePreferences);
  const saveLetter = useSavedLettersStore((s) => s.saveLetter);
  const markLetterAsSent = useSavedLettersStore((s) => s.markLetterAsSent);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [guidedMode, setGuidedMode] = useState(true);
  const [step, setStep] = useState(0);
  const [simpleMode, setSimpleMode] = useState(true);

  const [authorityId, setAuthorityId] = useState<LetterAuthorityId>("state-comptroller");
  const [kindId, setKindId] = useState<LetterKindId>("complaint");
  const [situation, setSituation] = useState<LetterSituation | undefined>(undefined);

  // Load saved preferences
  const [fullName, setFullName] = useState(preferences.fullName || "");
  const [idNumber, setIdNumber] = useState(preferences.idNumber || "");
  const [email, setEmail] = useState(preferences.email || "");
  const [phone, setPhone] = useState(preferences.phone || "");
  const [address, setAddress] = useState(preferences.address || "");
  const [city, setCity] = useState(preferences.city || "");
  const [dateISO, setDateISO] = useState(todayISO());
  const [caseNumber, setCaseNumber] = useState("");

  const [subject, setSubject] = useState("");
  const [facts, setFacts] = useState("");
  const [request, setRequest] = useState("");
  const [attachments, setAttachments] = useState("");

  // New smart fields - load from preferences
  const [tone, setTone] = useState<LetterTone>(preferences.preferredTone || "formal");
  const [urgency, setUrgency] = useState<LetterUrgency>("normal");
  const [eventDateISO, setEventDateISO] = useState("");
  const [firstContactDateISO, setFirstContactDateISO] = useState("");
  const [secondContactDateISO, setSecondContactDateISO] = useState("");
  const [noResponse, setNoResponse] = useState(false);
  const [useLegalTone, setUseLegalTone] = useState(false);
  const [selectedLegalPhrases, setSelectedLegalPhrases] = useState<readonly string[]>([]);

  const [copied, setCopied] = useState(false);
  const [draftFound, setDraftFound] = useState<{ savedAt: number; json: string } | null>(null);
  const [improving, setImproving] = useState(false);
  const [improvedText, setImprovedText] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editedLetterText, setEditedLetterText] = useState<string | null>(null);

  // Check if first visit
  useEffect(() => {
    const hasSeenOnboarding = window.localStorage.getItem("civio.onboarding.seen");
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

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
      readonly idNumber: string;
      readonly email: string;
      readonly phone: string;
      readonly address: string;
      readonly city: string;
      readonly dateISO: string;
      readonly caseNumber: string;
      readonly subject: string;
      readonly facts: string;
      readonly request: string;
      readonly attachments: string;
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
      str("idNumber") &&
      str("email") &&
      str("phone") &&
      str("address") &&
      str("city") &&
      str("dateISO") &&
      str("caseNumber") &&
      str("subject") &&
      str("facts") &&
      str("request") &&
      str("attachments")
    );
  }

  function hasMeaningfulData(d: DraftV1["data"]) {
    return (
      d.fullName.trim().length > 0 ||
      d.subject.trim().length > 0 ||
      d.facts.trim().length > 0 ||
      d.request.trim().length > 0
    );
  }

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (!isDraftV1(parsed)) return;
      if (!hasMeaningfulData(parsed.data)) return;
      setDraftFound({ savedAt: parsed.savedAt, json: raw });
    } catch {
      // ignore
    }
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
        idNumber,
        email,
        phone,
        address,
        city,
        dateISO,
        caseNumber,
        subject,
        facts,
        request,
        attachments,
      },
    };

    if (!hasMeaningfulData(draft.data)) return;

    const t = window.setTimeout(() => {
      try {
        window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch {
        // ignore
      }
    }, 600);

    return () => window.clearTimeout(t);
  }, [
    address,
    attachments,
    authorityId,
    caseNumber,
    city,
    dateISO,
    email,
    facts,
    fullName,
    guidedMode,
    idNumber,
    kindId,
    phone,
    request,
    simpleMode,
    step,
    subject,
  ]);

  const suggestions = useMemo(() => {
    return getLetterSuggestions({ authorityId, kindId });
  }, [authorityId, kindId]);

  const factsSuggestions = useMemo(() => suggestions.filter((s) => s.target === "facts"), [suggestions]);
  const requestSuggestions = useMemo(() => suggestions.filter((s) => s.target === "request"), [suggestions]);

  const presets = useMemo(() => {
    return getLetterPresets({ authorityId, kindId, situation });
  }, [authorityId, kindId, situation]);

  // Save preferences when "remember me" is enabled
  useEffect(() => {
    if (preferences.rememberMe) {
      updatePreferences({
        fullName: fullName || undefined,
        idNumber: idNumber || undefined,
        email: email || undefined,
        phone: phone || undefined,
        address: address || undefined,
        city: city || undefined,
        preferredTone: tone,
      });
    }
  }, [fullName, idNumber, email, phone, address, city, tone, preferences.rememberMe, updatePreferences]);

  const steps = useMemo(
    () => ["רשות וסוג", "תרחיש", "פרטי פונה", "תוכן", "תצוגה"],
    [],
  );

  function appendText(current: string, snippet: string) {
    const trimmed = current.trim();
    if (!trimmed) return snippet;
    if (trimmed.endsWith("\n")) return `${trimmed}${snippet}`;
    return `${trimmed}\n${snippet}`;
  }

  const input: LetterComposerInput | null = useMemo(() => {
    if (fullName.trim().length < 2) return null;
    if (subject.trim().length < 4) return null;
    if (facts.trim().length < 10) return null;
    if (request.trim().length < 6) return null;

    return {
      authorityId,
      kindId,
      fullName: fullName.trim(),
      idNumber: idNumber.trim() ? idNumber.trim() : undefined,
      email: email.trim() ? email.trim() : undefined,
      phone: phone.trim() ? phone.trim() : undefined,
      address: address.trim() ? address.trim() : undefined,
      caseNumber: caseNumber.trim() ? caseNumber.trim() : undefined,
      city: city.trim() ? city.trim() : undefined,
      dateISO,
      subject: subject.trim(),
      facts: facts.trim(),
      request: request.trim(),
      attachments: attachments.trim() ? attachments.trim() : undefined,
      // New smart fields
      tone,
      urgency,
      eventDateISO: eventDateISO || undefined,
      firstContactDateISO: firstContactDateISO || undefined,
      secondContactDateISO: secondContactDateISO || undefined,
      noResponse: noResponse || undefined,
      useLegalTone: useLegalTone || undefined,
      selectedLegalPhrases: selectedLegalPhrases.length > 0 ? selectedLegalPhrases : undefined,
      situation: situation || undefined,
    };
  }, [
    address,
    attachments,
    authorityId,
    caseNumber,
    city,
    dateISO,
    email,
    eventDateISO,
    facts,
    firstContactDateISO,
    fullName,
    idNumber,
    kindId,
    noResponse,
    phone,
    request,
    secondContactDateISO,
    selectedLegalPhrases,
    situation,
    subject,
    tone,
    urgency,
    useLegalTone,
  ]);

  const letter: GeneratedLetter | null = useMemo(() => {
    if (!input) return null;
    return generateLetter(input);
  }, [input]);

  const canNext = useMemo(() => {
    if (!guidedMode) return true;
    if (step === 0) return true;
    if (step === 1) return true;
    if (step === 2) return fullName.trim().length >= 2;
    if (step === 3) return subject.trim().length >= 4 && facts.trim().length >= 10 && request.trim().length >= 6;
    return true;
  }, [facts, fullName, guidedMode, request, step, subject]);

  function downloadAsWord(currentLetter: GeneratedLetter) {
    const content = `${currentLetter.bodyText}\n\n${currentLetter.disclaimer}`;
    const blob = new Blob([content], { type: "application/msword;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "civio-letter.doc";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function next() {
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }
  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  if (!enabled) {
    return (
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Alert severity="info">מחולל המכתבים כבוי כרגע (Feature Flag).</Alert>
      </Container>
    );
  }

  const fontSize = preferences.fontSize || "medium";
  const fontSizeMap = {
    small: "0.875rem",
    medium: "1rem",
    large: "1.125rem",
    xlarge: "1.25rem",
  };

  return (
    <Container maxWidth="md" sx={{ py: 6, fontSize: fontSizeMap[fontSize] }}>
      <OnboardingDialog
        open={showOnboarding}
        onClose={() => {
          setShowOnboarding(false);
          window.localStorage.setItem("civio.onboarding.seen", "true");
        }}
        onRememberMeChange={(remember) => {
          updatePreferences({ rememberMe: remember });
        }}
      />
      <Stack spacing={3}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              מחולל מכתבים לרשויות (חינם)
            </Typography>
            <Typography sx={{ color: "text.secondary", mt: 1 }}>
              אין שליחה מתוך המערכת. אפשר להעתיק טקסט או להדפיס ולשמור כ‑PDF.
            </Typography>
          </Box>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="font-size-label">גודל טקסט</InputLabel>
            <Select
              labelId="font-size-label"
              label="גודל טקסט"
              value={fontSize}
              onChange={(e) => updatePreferences({ fontSize: e.target.value as "small" | "medium" | "large" | "xlarge" })}
            >
              <MenuItem value="small">קטן</MenuItem>
              <MenuItem value="medium">בינוני</MenuItem>
              <MenuItem value="large">גדול</MenuItem>
              <MenuItem value="xlarge">גדול מאוד</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {copied ? <Alert severity="success">הועתק ללוח.</Alert> : null}
        {draftFound ? (
          <Alert
            severity="info"
            action={
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={() => {
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
                      setIdNumber(d.idNumber);
                      setEmail(d.email);
                      setPhone(d.phone);
                      setAddress(d.address);
                      setCity(d.city);
                      setDateISO(d.dateISO);
                      setCaseNumber(d.caseNumber);
                      setSubject(d.subject);
                      setFacts(d.facts);
                      setRequest(d.request);
                      setAttachments(d.attachments);
                      setDraftFound(null);
                    } catch {
                      // ignore
                    }
                  }}
                >
                  שחזור
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => {
                    try {
                      window.localStorage.removeItem(DRAFT_KEY);
                    } catch {
                      // ignore
                    }
                    setDraftFound(null);
                  }}
                >
                  מחיקה
                </Button>
                <Button size="small" onClick={() => setDraftFound(null)}>
                  לא עכשיו
                </Button>
              </Stack>
            }
          >
            נמצאה טיוטה שנשמרה מקומית במכשיר. לשחזר?
          </Alert>
        ) : null}

        <Paper variant="outlined" sx={{ p: 2 }}>
          <Stack spacing={1.5}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
            >
              <Typography sx={{ fontWeight: 900 }}>מצב עבודה</Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={guidedMode}
                    onChange={(_, v) => {
                      setGuidedMode(v);
                      setStep(0);
                    }}
                  />
                }
                label={guidedMode ? "מודרך (שלבים)" : "חופשי (טופס מלא)"}
              />
            </Stack>

            {guidedMode ? (
              <>
                <Stepper activeStep={step} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between" }}>
                  <Button variant="outlined" onClick={back} disabled={step === 0}>
                    חזרה
                  </Button>
                  <Button variant="contained" onClick={next} disabled={!canNext || step === steps.length - 1}>
                    המשך
                  </Button>
                </Stack>
              </>
            ) : null}
          </Stack>
        </Paper>

        {guidedMode ? (
          <>
            {step === 0 ? (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: 800 }}>רשות וסוג פנייה</Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <FormControl fullWidth>
                      <InputLabel id="authority-label">רשות</InputLabel>
                      <Select
                        labelId="authority-label"
                        label="רשות"
                        value={authorityId}
                        onChange={(e) => setAuthorityId(e.target.value as LetterAuthorityId)}
                      >
                        {LETTER_AUTHORITIES.map((a) => (
                          <MenuItem key={a.id} value={a.id}>
                            {a.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel id="kind-label">סוג פנייה</InputLabel>
                      <Select
                        labelId="kind-label"
                        label="סוג פנייה"
                        value={kindId}
                        onChange={(e) => setKindId(e.target.value as LetterKindId)}
                      >
                        {LETTER_KINDS.map((k) => (
                          <MenuItem key={k.id} value={k.id}>
                            {k.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Stack>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    לחצי "המשך" כדי לבחור תרחיש מוכן (אופציונלי).
                  </Typography>
                </Stack>
              </Paper>
            ) : null}

            {step === 1 ? (
              <>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography sx={{ fontWeight: 800 }}>מה המצב שלך?</Typography>
                      <HelpTooltip
                        title="למה זה חשוב?"
                        explanation="הבחירה במצב עוזרת לנו להתאים את הניסוח והטון של המכתב. מכתב 'אין מענה' יהיה יותר תקיף, בעוד מכתב 'פנייה ראשונית' יהיה יותר מכבד."
                      />
                    </Box>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      בחרי את המצב המתאים כדי לקבל תבנית מותאמת, או דלגי ותכתבי בעצמך.
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                      <Chip
                        label="פנייה ראשונית"
                        onClick={() => {
                          setSituation("first-contact");
                          setNoResponse(false);
                        }}
                        clickable
                        color={situation === "first-contact" ? "primary" : "default"}
                        variant={situation === "first-contact" ? "filled" : "outlined"}
                      />
                      <Chip
                        label="אין מענה"
                        onClick={() => {
                          setSituation("no-response");
                          setNoResponse(true);
                        }}
                        clickable
                        color={situation === "no-response" ? "primary" : "default"}
                        variant={situation === "no-response" ? "filled" : "outlined"}
                      />
                      <Chip
                        label="ערעור על החלטה"
                        onClick={() => {
                          setSituation("appeal");
                          setKindId("appeal-objection");
                        }}
                        clickable
                        color={situation === "appeal" ? "primary" : "default"}
                        variant={situation === "appeal" ? "filled" : "outlined"}
                      />
                      <Chip
                        label="התראה לפני צעדים"
                        onClick={() => {
                          setSituation("warning");
                        }}
                        clickable
                        color={situation === "warning" ? "primary" : "default"}
                        variant={situation === "warning" ? "filled" : "outlined"}
                      />
                      <Chip
                        label="ללא תרחיש (אכתוב בעצמי)"
                        onClick={() => {
                          setSituation(undefined);
                          setSubject("");
                          setFacts("");
                          setRequest("");
                          next();
                        }}
                        clickable
                        variant="outlined"
                      />
                    </Stack>
                    {presets.length > 0 ? (
                      <>
                        <Typography sx={{ fontWeight: 700, mt: 1 }}>תבניות מוכנות לפי המצב:</Typography>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                          {presets.map((p) => (
                            <Chip
                              key={p.id}
                              label={p.label}
                              onClick={() => {
                                setSubject(p.subject);
                                setFacts(p.facts);
                                setRequest(p.request);
                                next();
                              }}
                              clickable
                              color="primary"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      </>
                    ) : situation ? (
                      <Alert severity="info">אין עדיין תבנית מוכנה למצב הזה — לחצי "המשך" ותכתבי בעצמך.</Alert>
                    ) : null}
                  </Stack>
                </Paper>
                {/* Authority Info Card - shows relevant links and tips */}
                {authorityId ? <AuthorityInfoCard authorityId={authorityId} /> : null}
              </>
            ) : null}

            {step === 2 ? (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: 800 }}>פרטי פונה (מינימום)</Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="שם מלא (חובה)"
                      fullWidth
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField label="ת״ז (אופציונלי)" fullWidth value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                  </Stack>

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField label="אימייל (אופציונלי)" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextField label="טלפון (אופציונלי)" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </Stack>

                  <TextField
                    label="מס׳ תיק/פנייה (אופציונלי)"
                    value={caseNumber}
                    onChange={(e) => setCaseNumber(e.target.value)}
                    helperText="אם יש מספר פנייה/תיק מהרשות – זה עוזר להם לאתר מהר."
                  />

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField label="כתובת (אופציונלי)" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
                    <TextField label="עיר (אופציונלי)" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
                    <TextField
                      label="תאריך"
                      type="date"
                      value={dateISO}
                      onChange={(e) => setDateISO(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Stack>
                </Stack>
              </Paper>
            ) : null}

            {step === 3 ? (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: 800 }}>תוכן</Typography>
                  <FormControlLabel
                    control={<Switch checked={simpleMode} onChange={(_, v) => setSimpleMode(v)} />}
                    label="מצב שפה פשוטה (יותר כפתורים, פחות הקלדה)"
                  />

                    {/* Smart letter options */}
                    <Divider />
                    <Typography sx={{ fontWeight: 700 }}>הגדרות מכתב חכם</Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <FormControl fullWidth>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                          <InputLabel id="tone-label">טון המכתב</InputLabel>
                          <HelpTooltip
                            title="טון המכתב"
                            explanation="טון עדין = מכבד ולא מאיים, טוב לפניות ראשונות. טון רשמי = סטנדרטי ומקצועי. טון רשמי+משפטי = כולל אזכורים משפטיים רכים שמחזקים את הבקשה."
                          />
                        </Box>
                        <Select
                          labelId="tone-label"
                          label="טון המכתב"
                          value={tone}
                          onChange={(e) => setTone(e.target.value as LetterTone)}
                        >
                          <MenuItem value="soft">עדין ומכבד</MenuItem>
                          <MenuItem value="formal">רשמי</MenuItem>
                          <MenuItem value="formal-legal">רשמי + חיזוק משפטי</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                          <InputLabel id="urgency-label">דחיפות</InputLabel>
                          <HelpTooltip
                            title="דחיפות"
                            explanation="דחיפות גבוהה = המכתב יכלול בקשה למענה דחוף. משפיע על הניסוח והדגשים במכתב."
                          />
                        </Box>
                        <Select
                          labelId="urgency-label"
                          label="דחיפות"
                          value={urgency}
                          onChange={(e) => setUrgency(e.target.value as LetterUrgency)}
                        >
                          <MenuItem value="normal">רגיל</MenuItem>
                          <MenuItem value="high">גבוהה</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>
                    <EmergencyInfo urgency={urgency} />

                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    תאריכים (אופציונלי) – עוזרים לבנות מכתב מדויק יותר
                  </Typography>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                      label="תאריך האירוע"
                      type="date"
                      value={eventDateISO}
                      onChange={(e) => setEventDateISO(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                    <TextField
                      label="תאריך פנייה ראשונה"
                      type="date"
                      value={firstContactDateISO}
                      onChange={(e) => setFirstContactDateISO(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                    <TextField
                      label="תאריך פנייה נוספת (אופציונלי)"
                      type="date"
                      value={secondContactDateISO}
                      onChange={(e) => setSecondContactDateISO(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                    />
                  </Stack>

                  <FormControlLabel
                    control={<Switch checked={noResponse} onChange={(_, v) => setNoResponse(v)} />}
                    label="לא קיבלתי מענה / יש עיכוב חריג"
                  />

                  {tone !== "soft" ? (
                    <Stack spacing={1}>
                      <FormControlLabel
                        control={<Switch checked={useLegalTone} onChange={(_, v) => setUseLegalTone(v)} />}
                        label="הוסף משפטים משפטיים רכים (חובת מענה, זמן סביר, מינהל תקין)"
                      />
                      {useLegalTone ? (
                        <Stack spacing={0.5}>
                          <Typography variant="body2" sx={{ color: "text.secondary" }}>
                            בחר/י משפטים להכללה במכתב:
                          </Typography>
                          {LEGAL_SOFT_PHRASES.map((phrase) => (
                            <FormControlLabel
                              key={phrase}
                              control={
                                <Switch
                                  checked={selectedLegalPhrases.includes(phrase)}
                                  onChange={(_, checked) => {
                                    if (checked) {
                                      setSelectedLegalPhrases([...selectedLegalPhrases, phrase]);
                                    } else {
                                      setSelectedLegalPhrases(selectedLegalPhrases.filter((p) => p !== phrase));
                                    }
                                  }}
                                />
                              }
                              label={phrase}
                            />
                          ))}
                        </Stack>
                      ) : null}
                    </Stack>
                  ) : null}

                  <Divider />
                  <TextField label="נושא (חובה)" value={subject} onChange={(e) => setSubject(e.target.value)} />

                  {simpleMode ? (
                    <Stack spacing={1}>
                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        אפשר לבחור משפטים מוכנים ולהוסיף אותם לטקסט. אפשר לערוך אחר כך.
                      </Typography>

                      <Typography sx={{ fontWeight: 700 }}>משפטים מוכנים ל״מה קרה״</Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                        {factsSuggestions.map((s) => (
                          <Chip
                            key={s.id}
                            label={s.label}
                            onClick={() => setFacts((v) => appendText(v, s.text))}
                            clickable
                            variant="outlined"
                          />
                        ))}
                      </Stack>

                      <Typography sx={{ fontWeight: 700 }}>משפטים מוכנים ל״מה מבקשים״</Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                        {requestSuggestions.map((s) => (
                          <Chip
                            key={s.id}
                            label={s.label}
                            onClick={() => setRequest((v) => appendText(v, s.text))}
                            clickable
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </Stack>
                  ) : null}

                  <TextField
                    label="מה קרה? (חובה)"
                    value={facts}
                    onChange={(e) => setFacts(e.target.value)}
                    multiline
                    minRows={4}
                    helperText={simpleMode ? "אפשר להתחיל ממשפטים מוכנים למעלה." : "תיאור קצר וברור. אפשר נקודות."}
                  />
                  <TextField
                    label="מה מבקשים שיקרה? (חובה)"
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    multiline
                    minRows={3}
                  />
                  <TextField
                    label="נספחים/מסמכים (אופציונלי)"
                    value={attachments}
                    onChange={(e) => setAttachments(e.target.value)}
                    helperText="למשל: תלושי שכר, החלטה, סיכום רפואי…"
                  />
                </Stack>
              </Paper>
            ) : null}

            {step === 4 ? (
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: 900 }}>תצוגה מקדימה</Typography>

                  {!letter ? (
                    <Alert severity="info">מלא/י את השדות החובה כדי לקבל מכתב.</Alert>
                  ) : (
                    <>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {isAIAvailable() ? (
                          <Button
                            variant="outlined"
                            color="secondary"
                            disabled={improving}
                            onClick={async () => {
                              if (!letter) return;
                              setImproving(true);
                              try {
                                const result = await improveText(letter.bodyText, { tone });
                                setImprovedText(result.improved);
                              } catch (err) {
                                console.error("Failed to improve text:", err);
                              } finally {
                                setImproving(false);
                              }
                            }}
                          >
                            {improving ? "משפר ניסוח..." : "🤖 שיפור ניסוח (AI)"}
                          </Button>
                        ) : null}
                        <Button
                          variant="contained"
                          onClick={() => {
                            const text = editedLetterText
                              ? `${editedLetterText}\n\n${letter.disclaimer}`
                              : improvedText
                                ? `${improvedText}\n\n${letter.disclaimer}`
                                : `${letter.bodyText}\n\n${letter.disclaimer}`;
                            void navigator.clipboard
                              .writeText(text)
                              .then(() => setCopied(true))
                              .catch(() => setCopied(false));
                          }}
                        >
                          העתקת טקסט
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            setCopied(false);
                            window.print();
                          }}
                        >
                          הדפסה / שמירה כ‑PDF
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => downloadAsWord(letter)}
                        >
                          הורדה כ‑Word
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => {
                            if (letter) {
                              const emailBody = encodeURIComponent(
                                `${letter.bodyText}\n\n${letter.disclaimer}`
                              );
                              const emailSubject = encodeURIComponent(letter.subject || "פנייה");
                              window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
                            }
                          }}
                        >
                          📧 העתקה למייל
                        </Button>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => {
                            if (letter && fullName) {
                              const saved = saveLetter({
                                ...letter,
                                authorityId,
                                fullName,
                              });
                              markLetterAsSent(saved.id);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 3000);
                            }
                          }}
                        >
                          שמירת מכתב
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => setEditorOpen(true)}
                        >
                          ✏️ עריכה ידנית
                        </Button>
                        <Button
                          variant="text"
                          onClick={() => navigate("/my-letters")}
                          sx={{ ml: "auto" }}
                        >
                          המכתבים שלי
                        </Button>
                      </Box>
                      {improvedText ? (
                        <Alert severity="info" sx={{ mt: 1 }} onClose={() => setImprovedText(null)}>
                          <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
                            טקסט משופר:
                          </Typography>
                          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                            {improvedText}
                          </Typography>
                          <Button
                            size="small"
                            variant="outlined"
                            sx={{ mt: 1 }}
                            onClick={() => {
                              if (letter) {
                                // Update letter with improved text
                                const updatedInput = input;
                                if (updatedInput) {
                                  // Regenerate letter with improved body
                                  // This is a simplified approach - in production, you'd want to update the facts/request fields
                                }
                              }
                              setImprovedText(null);
                            }}
                          >
                            השתמש בטקסט המשופר
                          </Button>
                        </Alert>
                      ) : null}
                      {copied && letter ? (
                        <Alert severity="success" sx={{ mt: 1 }}>
                          {fullName ? "המכתב נשמר בהצלחה! אפשר לראות אותו ב'המכתבים שלי'." : "הטקסט הועתק ללוח."}
                        </Alert>
                      ) : null}

                      <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                        {letter.disclaimer}
                      </Typography>

                      <LetterPreview letter={letter} fullName={fullName} editedText={editedLetterText} />

                      {/* Print-only block: clean layout */}
                      <Box className="civio-print-only" sx={{ display: "none" }}>
                        <div style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "12pt", lineHeight: 1.6, color: "#000" }}>
                          <div style={{ marginBottom: "2em", textAlign: "right" }}>
                            {new Date().toLocaleDateString("he-IL", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div style={{ marginBottom: "2em" }}>
                            {editedLetterText || letter.bodyText}
                          </div>
                          {fullName && (
                            <div style={{ marginTop: "3em", fontWeight: "bold" }}>
                              {fullName}
                            </div>
                          )}
                          <div style={{ marginTop: "1em", fontSize: "10pt", color: "#666" }}>
                            {letter.disclaimer}
                          </div>
                        </div>
                      </Box>
                    </>
                  )}
                </Stack>
              </Paper>
            ) : null}

            {letter ? (
              <LetterEditor
                open={editorOpen}
                letter={letter}
                onClose={() => setEditorOpen(false)}
                onSave={(editedText) => {
                  setEditedLetterText(editedText);
                }}
              />
            ) : null}
          </>
        ) : (
          <>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography sx={{ fontWeight: 800 }}>בחירה מהירה</Typography>
                <FormControlLabel
                  control={<Switch checked={simpleMode} onChange={(_, v) => setSimpleMode(v)} />}
                  label="מצב שפה פשוטה (יותר כפתורים, פחות הקלדה)"
                />
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="authority-label">רשות</InputLabel>
                    <Select
                      labelId="authority-label"
                      label="רשות"
                      value={authorityId}
                      onChange={(e) => setAuthorityId(e.target.value as LetterAuthorityId)}
                    >
                      {LETTER_AUTHORITIES.map((a) => (
                        <MenuItem key={a.id} value={a.id}>
                          {a.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="kind-label">סוג פנייה</InputLabel>
                    <Select
                      labelId="kind-label"
                      label="סוג פנייה"
                      value={kindId}
                      onChange={(e) => setKindId(e.target.value as LetterKindId)}
                    >
                      {LETTER_KINDS.map((k) => (
                        <MenuItem key={k.id} value={k.id}>
                          {k.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Stack>

                <Divider />

                <Typography sx={{ fontWeight: 800 }}>פרטי פונה (מינימום)</Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="שם מלא (חובה)" fullWidth value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  <TextField label="ת״ז (אופציונלי)" fullWidth value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="אימייל (אופציונלי)" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                  <TextField label="טלפון (אופציונלי)" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Stack>

                <TextField
                  label="מס׳ תיק/פנייה (אופציונלי)"
                  value={caseNumber}
                  onChange={(e) => setCaseNumber(e.target.value)}
                  helperText="אם יש מספר פנייה/תיק מהרשות – זה עוזר להם לאתר מהר."
                />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="כתובת (אופציונלי)" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
                  <TextField label="עיר (אופציונלי)" fullWidth value={city} onChange={(e) => setCity(e.target.value)} />
                  <TextField
                    label="תאריך"
                    type="date"
                    value={dateISO}
                    onChange={(e) => setDateISO(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Stack>

                <Divider />

                <Typography sx={{ fontWeight: 800 }}>תוכן (עם כוונה – לא משפטיזציה)</Typography>

                {/* Smart letter options */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <FormControl fullWidth>
                    <InputLabel id="tone-label-free">טון המכתב</InputLabel>
                    <Select
                      labelId="tone-label-free"
                      label="טון המכתב"
                      value={tone}
                      onChange={(e) => setTone(e.target.value as LetterTone)}
                    >
                      <MenuItem value="soft">עדין ומכבד</MenuItem>
                      <MenuItem value="formal">רשמי</MenuItem>
                      <MenuItem value="formal-legal">רשמי + חיזוק משפטי</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel id="urgency-label-free">דחיפות</InputLabel>
                    <Select
                      labelId="urgency-label-free"
                      label="דחיפות"
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as LetterUrgency)}
                    >
                      <MenuItem value="normal">רגיל</MenuItem>
                      <MenuItem value="high">גבוהה</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    label="תאריך האירוע (אופציונלי)"
                    type="date"
                    value={eventDateISO}
                    onChange={(e) => setEventDateISO(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <TextField
                    label="תאריך פנייה ראשונה (אופציונלי)"
                    type="date"
                    value={firstContactDateISO}
                    onChange={(e) => setFirstContactDateISO(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                  <TextField
                    label="תאריך פנייה נוספת (אופציונלי)"
                    type="date"
                    value={secondContactDateISO}
                    onChange={(e) => setSecondContactDateISO(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Stack>

                <FormControlLabel
                  control={<Switch checked={noResponse} onChange={(_, v) => setNoResponse(v)} />}
                  label="לא קיבלתי מענה / יש עיכוב חריג"
                />

                {tone !== "soft" ? (
                  <FormControlLabel
                    control={<Switch checked={useLegalTone} onChange={(_, v) => setUseLegalTone(v)} />}
                    label="הוסף משפטים משפטיים רכים"
                  />
                ) : null}

                <TextField label="נושא (חובה)" value={subject} onChange={(e) => setSubject(e.target.value)} />

                {simpleMode ? (
                  <Stack spacing={1}>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      אפשר לבחור משפטים מוכנים ולהוסיף אותם לטקסט. אפשר לערוך אחר כך.
                    </Typography>

                    {presets.length > 0 ? (
                      <>
                        <Typography sx={{ fontWeight: 700 }}>תבניות מוכנות (ממלאות את המכתב)</Typography>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                          {presets.map((p) => (
                            <Chip
                              key={p.id}
                              label={p.label}
                              onClick={() => {
                                setSubject(p.subject);
                                setFacts(p.facts);
                                setRequest(p.request);
                              }}
                              clickable
                              color="primary"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      </>
                    ) : null}

                    <Typography sx={{ fontWeight: 700 }}>משפטים מוכנים ל״מה קרה״</Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                      {factsSuggestions.map((s) => (
                        <Chip
                          key={s.id}
                          label={s.label}
                          onClick={() => setFacts((v) => appendText(v, s.text))}
                          clickable
                          variant="outlined"
                        />
                      ))}
                    </Stack>

                    <Typography sx={{ fontWeight: 700 }}>משפטים מוכנים ל״מה מבקשים״</Typography>
                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                      {requestSuggestions.map((s) => (
                        <Chip
                          key={s.id}
                          label={s.label}
                          onClick={() => setRequest((v) => appendText(v, s.text))}
                          clickable
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </Stack>
                ) : null}

                <TextField
                  label="מה קרה? (חובה)"
                  value={facts}
                  onChange={(e) => setFacts(e.target.value)}
                  multiline
                  minRows={4}
                  helperText={simpleMode ? "אפשר להתחיל ממשפטים מוכנים למעלה." : "תיאור קצר וברור. אפשר נקודות."}
                />
                <TextField
                  label="מה מבקשים שיקרה? (חובה)"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  multiline
                  minRows={3}
                />
                <TextField
                  label="נספחים/מסמכים (אופציונלי)"
                  value={attachments}
                  onChange={(e) => setAttachments(e.target.value)}
                  helperText="למשל: תלושי שכר, החלטה, סיכום רפואי…"
                />
              </Stack>
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Typography sx={{ fontWeight: 900 }}>תצוגה מקדימה</Typography>

                {!letter ? (
                  <Alert severity="info">מלא/י את השדות החובה כדי לקבל מכתב.</Alert>
                ) : (
                  <>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          const text = `${letter.bodyText}\n\n${letter.disclaimer}`;
                          void navigator.clipboard
                            .writeText(text)
                            .then(() => setCopied(true))
                            .catch(() => setCopied(false));
                        }}
                      >
                        העתקת טקסט
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setCopied(false);
                          window.print();
                        }}
                      >
                        הדפסה / שמירה כ‑PDF
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => letter && downloadAsWord(letter)}
                      >
                        הורדה כ‑Word
                      </Button>
                    </Box>

                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {letter.disclaimer}
                    </Typography>

                    <LetterPreview letter={letter} fullName={fullName} editedText={editedLetterText} />

                    {/* Print-only block: clean layout */}
                    <Box className="civio-print-only" sx={{ display: "none" }}>
                      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: 14, lineHeight: 1.5 }}>
                        {letter.bodyText}
                        {"\n\n"}
                        {letter.disclaimer}
                      </pre>
                    </Box>
                  </>
                )}
              </Stack>
            </Paper>
          </>
        )}
      </Stack>
    </Container>
  );
}


