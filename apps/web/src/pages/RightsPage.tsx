import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RIGHTS_AUTHORITIES, RIGHTS_CATEGORIES, RIGHTS_ITEMS, RIGHTS_TOPICS, isRightStale } from "@repo/logic";
import type { RightSource } from "@repo/types";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function RightsPage() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [authority, setAuthority] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    return RIGHTS_ITEMS.filter((it) => {
      if (category && it.categoryId !== category) return false;
      if (authority && it.authorityId !== authority) return false;
      if (topic && it.topicId !== topic) return false;
      if (!nq) return true;
      const hay = `${it.title} ${it.summary} ${(it.tags ?? []).join(" ")}`;
      return normalize(hay).includes(nq);
    });
  }, [q, category, authority, topic]);

  const grouped = useMemo(() => {
    const buckets = new Map<string, typeof RIGHTS_ITEMS>();
    for (const it of filtered) {
      const arr = buckets.get(it.categoryId) ?? [];
      buckets.set(it.categoryId, [...arr, it]);
    }

    // Keep a stable order based on the declared categories list.
    return RIGHTS_CATEGORIES.map((c) => ({
      category: c,
      items: (buckets.get(c.id) ?? []).slice().sort((a, b) => a.title.localeCompare(b.title, "he")),
    })).filter((x) => x.items.length > 0);
  }, [filtered]);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 } }}>
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h1" sx={{ fontSize: { xs: 28, sm: 32 }, fontWeight: 800 }}>
            מאגר זכויות
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 0.75, lineHeight: 1.9 }}>
            מידע כללי והכוונה ראשונית (לא ייעוץ משפטי). בכל כרטיס מופיעים מקורות לקריאה נוספת ותאריך בדיקה אחרון.
          </Typography>
        </Box>

          <Card variant="outlined" sx={{ borderRadius: 4 }}>
            <CardContent>
              <Typography variant="h2" sx={{ fontSize: 22, fontWeight: 800, mb: 1 }}>
                איך פועלים מול רשות/חברה משכנת (מדריך קצר)
              </Typography>
              <Stack spacing={1.25} sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                <Typography>1) כתבי “ציר זמן” קצר: מה קרה, ממתי, מה ביקשת, ומה ענו.</Typography>
                <Typography>2) תמיד בקשי החלטה/תשובה בכתב + מספר פנייה/תיק.</Typography>
                <Typography>3) בקשת מסמכים: אם חסר מידע—בקשי “פירוט/מסמכים/נימוקים” לפני ערר.</Typography>
                <Typography>4) אין מענה? שלחי תזכורת רשמית, ואז פנייה ל“פניות הציבור” של אותו גוף.</Typography>
                <Typography>5) אם יש דחיפות/סיכון—צייני זאת במפורש והוסיפי מסמך תומך.</Typography>
              </Stack>

              <Accordion sx={{ mt: 2, borderRadius: 3 }} disableGutters elevation={0} variant="outlined">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-legal-content" id="panel-legal-header">
                  <Typography sx={{ fontWeight: 800 }}>שקיפות משפטית (חשוב לקרוא)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                    מגדלור נותנת הכוונה כללית. חוקים/נהלים משתנים—לכן אנחנו מציגים מקורות רשמיים ותאריך בדיקה.
                    אם יש סתירה—העדיפות תמיד למקור הרשמי ולייעוץ מקצועי.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>

        <Card variant="outlined" sx={{ borderRadius: 4 }}>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                label="חיפוש (למשל: פיטורים, עמידר, שכר דירה)"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                fullWidth
              />

              <Stack spacing={1.25}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  קטגוריה
                </Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Chip
                    label="הכול"
                    clickable
                    color={!category ? "primary" : "default"}
                    onClick={() => setCategory(null)}
                  />
                  {RIGHTS_CATEGORIES.map((c) => (
                    <Chip
                      key={c.id}
                      label={c.label}
                      clickable
                      color={category === c.id ? "primary" : "default"}
                      onClick={() => setCategory(c.id)}
                    />
                  ))}
                </Stack>
              </Stack>

              <Stack spacing={1.25}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  סינון לפי גוף
                </Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Chip
                    label="הכול"
                    clickable
                    color={!authority ? "primary" : "default"}
                    onClick={() => setAuthority(null)}
                  />
                  {RIGHTS_AUTHORITIES.map((a) => (
                    <Chip
                      key={a.id}
                      label={a.label}
                      clickable
                      color={authority === a.id ? "primary" : "default"}
                      onClick={() => setAuthority(a.id)}
                    />
                  ))}
                </Stack>
              </Stack>

              <Stack spacing={1.25}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  סינון לפי נושא
                </Typography>
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  <Chip
                    label="הכול"
                    clickable
                    color={!topic ? "primary" : "default"}
                    onClick={() => setTopic(null)}
                  />
                  {RIGHTS_TOPICS.map((t) => (
                    <Chip
                      key={t.id}
                      label={t.label}
                      clickable
                      color={topic === t.id ? "primary" : "default"}
                      onClick={() => setTopic(t.id)}
                    />
                  ))}
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Stack spacing={2}>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {filtered.length} תוצאות
          </Typography>

          {grouped.map(({ category: cat, items }) => (
            <Stack key={cat.id} spacing={1.25}>
              <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
                <Typography variant="h2" sx={{ fontSize: 22, fontWeight: 900 }}>
                  {cat.label}
                </Typography>
                {cat.description ? (
                  <Typography sx={{ color: "text.secondary" }}>
                    {cat.description}
                  </Typography>
                ) : null}
              </Box>

              {items.map((it) => {
                const a = RIGHTS_AUTHORITIES.find((x) => x.id === it.authorityId);
                const t = RIGHTS_TOPICS.find((x) => x.id === it.topicId);
                const stale = isRightStale(it);
                return (
                  <Card key={it.id} variant="outlined" sx={{ borderRadius: 4 }}>
                    <CardContent>
                      <Stack spacing={1.25}>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ alignItems: "center" }}>
                          <Chip size="small" label={a?.label ?? it.authorityId} />
                          <Chip size="small" label={t?.label ?? it.topicId} />
                          {stale ? <Chip size="small" color="warning" label="דורש עדכון" /> : null}
                          <Box sx={{ flex: 1 }} />
                          <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            נבדק לאחרונה: {it.lastReviewedISO}
                          </Typography>
                        </Stack>

                        <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 800 }}>
                          {it.title}
                        </Typography>
                        <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>{it.summary}</Typography>

                        <Divider />

                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.75 }}>
                            צעדים מומלצים
                          </Typography>
                          <Stack component="ol" spacing={0.5} sx={{ ps: 2.25, m: 0 }}>
                            {it.steps.map((s: string) => (
                              <Typography component="li" key={s} sx={{ lineHeight: 1.9 }}>
                                {s}
                              </Typography>
                            ))}
                          </Stack>
                        </Box>

                        {it.notes ? (
                          <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
                            <strong>הערה:</strong> {it.notes}
                          </Typography>
                        ) : null}

                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.75 }}>
                            מקורות לקריאה נוספת
                          </Typography>
                          <Stack spacing={0.5}>
                            {it.sources.map((src: RightSource) => (
                              <Link key={src.url} href={src.url} target="_blank" rel="noreferrer" underline="hover">
                                {src.publisher ? `${src.publisher}: ` : ""}
                                {src.title}
                              </Link>
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}


