import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "calc(100dvh - 72px)",
        display: "grid",
        placeItems: "start center",
        px: 2,
        py: { xs: 4, sm: 6 },
        background:
          "radial-gradient(900px 500px at 50% 20%, rgba(30, 64, 175, 0.14), transparent 60%), radial-gradient(700px 400px at 20% 90%, rgba(59, 130, 246, 0.10), transparent 55%)",
      }}
    >
      <Container maxWidth="sm">
        <Stack spacing={2.5} sx={{ textAlign: "center" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              component="img"
              src="/migdal.png"
              alt="לוגו מגדלור"
              sx={{
                width: { xs: 140, sm: 170 },
                height: { xs: 140, sm: 170 },
                maxWidth: "80vw",
                objectFit: "contain",
                display: "block",
                borderRadius: 4,
                boxShadow: "0 14px 44px rgba(0,0,0,0.22)",
              }}
            />
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {t("slogan")}
          </Typography>

          <Typography sx={{ color: "text.primary", lineHeight: 1.8, fontWeight: 600 }}>
            הכוונה ברורה למיצוי זכויות בישראל מול רשויות וגופים ציבוריים—בשפה פשוטה, בלי להסתבך.
          </Typography>

          <Typography sx={{ color: "text.secondary", lineHeight: 1.9 }}>
            בדיקת זכויות בשלבים, מאגר זכויות עם מקורות, ומחולל מכתבים חינמי לגופים כמו משרד השיכון, עמידר, רווחה וביטוח לאומי.
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            מגדלור מספקת מידע כללי בלבד ואינה מהווה ייעוץ משפטי.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} sx={{ justifyContent: "center", pt: 1 }}>
            <Button onClick={() => navigate("/w/employee-termination")} aria-label="התחלת שאלון">
              בדיקת זכויות (שאלון קצר)
            </Button>
            <Button variant="outlined" onClick={() => navigate("/letters")} aria-label="מעבר למחולל מכתבים">
              מחולל מכתבים (חינם)
            </Button>
          </Stack>

          <Stack direction="row" spacing={1.25} useFlexGap flexWrap="wrap" sx={{ justifyContent: "center", pt: 0.5 }}>
            <Button size="small" variant="text" onClick={() => navigate("/rights")} aria-label="מעבר למאגר זכויות">
              מאגר זכויות
            </Button>
            <Button size="small" variant="text" onClick={() => navigate("/lawyers")} aria-label="מעבר לאנשי מקצוע (פיילוט)">
              עו״ד/יועץ (פיילוט)
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}


