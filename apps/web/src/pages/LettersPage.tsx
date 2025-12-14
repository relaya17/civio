import { useEffect, useMemo, useState } from "react";
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
import type { GeneratedLetter, LetterAuthorityId, LetterComposerInput, LetterKindId } from "@repo/types";
import { LETTER_AUTHORITIES, LETTER_KINDS, generateLetter, getLetterSuggestions, getLetterPresets } from "@repo/logic";
import { useFeatureFlagsStore } from "../state/featureFlagsStore";

const DRAFT_KEY = "civio.letters.draft.web.v1";

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function LettersPage() {
  const enabled = useFeatureFlagsStore((s) => s.flags["letters.enabled"]);
  const [guidedMode, setGuidedMode] = useState(true);
  const [step, setStep] = useState(0);
  const [simpleMode, setSimpleMode] = useState(true);

  const [authorityId, setAuthorityId] = useState<LetterAuthorityId>("state-comptroller");
  const [kindId, setKindId] = useState<LetterKindId>("complaint");

  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [dateISO, setDateISO] = useState(todayISO());
  const [caseNumber, setCaseNumber] = useState("");

  const [subject, setSubject] = useState("");
  const [facts, setFacts] = useState("");
  const [request, setRequest] = useState("");
  const [attachments, setAttachments] = useState("");

  const [copied, setCopied] = useState(false);
  const [draftFound, setDraftFound] = useState<{ savedAt: number; json: string } | null>(null);

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
    return getLetterPresets({ authorityId, kindId });
  }, [authorityId, kindId]);

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
    };
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
    idNumber,
    kindId,
    phone,
    request,
    subject,
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

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            מחולל מכתבים לרשויות (חינם)
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 1 }}>
            אין שליחה מתוך המערכת. אפשר להעתיק טקסט או להדפיס ולשמור כ‑PDF.
          </Typography>
        </Box>

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
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Stack spacing={2}>
                  <Typography sx={{ fontWeight: 800 }}>תרחיש מוכן (אופציונלי)</Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    בחרי תרחיש כדי לקבל ניסוח התחלתי, או דלגי ותכתבי בעצמך.
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    <Chip
                      label="ללא תרחיש (אכתוב בעצמי)"
                      onClick={() => {
                        setSubject("");
                        setFacts("");
                        setRequest("");
                        next();
                      }}
                      clickable
                      variant="outlined"
                    />
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
                  {presets.length === 0 ? (
                    <Alert severity="info">אין עדיין תרחיש מוכן לבחירה הזו — לחצי "המשך" ותכתבי בעצמך.</Alert>
                  ) : null}
                </Stack>
              </Paper>
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
                      </Box>

                      <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        {letter.disclaimer}
                      </Typography>

                      <Box
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: 2,
                          p: 2,
                          bgcolor: "background.paper",
                          whiteSpace: "pre-wrap",
                          fontFamily: "inherit",
                        }}
                      >
                        {letter.bodyText}
                      </Box>

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
                    </Box>

                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                      {letter.disclaimer}
                    </Typography>

                    <Box
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                        p: 2,
                        bgcolor: "background.paper",
                        whiteSpace: "pre-wrap",
                        fontFamily: "inherit",
                      }}
                    >
                      {letter.bodyText}
                    </Box>

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


