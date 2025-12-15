import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const navigate = useNavigate();

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
            variant="h4"
            sx={{
              color: "text.primary",
              fontWeight: 800,
              lineHeight: 1.3,
              mb: 1,
            }}
          >
            אתם לא לבד – אנחנו כאן כדי לעזור
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              lineHeight: 1.4,
              mb: 2,
            }}
          >
            מגיע לכם מענה – נעזור לכם לכתוב נכון
          </Typography>

          <Box
            sx={{
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 3,
              p: 3,
              mb: 2,
            }}
          >
            <Typography sx={{ color: "text.primary", lineHeight: 1.9, mb: 2, fontWeight: 500 }}>
              האפליקציה אינה ייעוץ משפטי. היא כלי פשוט לעזור לכם לנסח פנייה מסודרת ומכבדת.
            </Typography>

            <Typography sx={{ color: "text.secondary", lineHeight: 1.9, mb: 1.5 }}>
              לא צריך להיות עורך דין כדי לפנות למוסדות. כאן תקבלו מכתב ברור ומובן.
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
              כל פנייה נשמרת אצלכם. אתם שולטים בכל דבר.
            </Typography>
          </Box>

          <Typography sx={{ color: "text.secondary", lineHeight: 1.8, fontSize: "0.95rem" }}>
            בדיקת זכויות בשלבים, מאגר זכויות עם מקורות, ומחולל מכתבים חינמי לגופים כמו משרד השיכון, עמידר, רווחה וביטוח לאומי.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ justifyContent: "center", pt: 2 }}>
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate("/letters")}
              aria-label="התחל לכתוב מכתב"
              sx={{ minWidth: { xs: "100%", sm: 200 }, py: 1.5 }}
            >
              התחל לכתוב מכתב
            </Button>
            <Button
              size="large"
              variant="outlined"
              onClick={() => navigate("/w")}
              aria-label="בדיקת זכויות"
              sx={{ minWidth: { xs: "100%", sm: 200 }, py: 1.5 }}
            >
              בדיקת זכויות (שאלון קצר)
            </Button>
          </Stack>

          <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap" sx={{ justifyContent: "center", pt: 1.5 }}>
            <Button size="medium" variant="text" onClick={() => navigate("/rights")} aria-label="למד עוד על זכויותיך">
              למד עוד על זכויותיך
            </Button>
            <Button
              size="medium"
              variant="text"
              onClick={() => navigate("/lawyers")}
              aria-label="חיבור לאנשי מקצוע"
            >
              חיבור לאנשי מקצוע
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}


