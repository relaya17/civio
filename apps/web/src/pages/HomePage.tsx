import { Box, Button, Container, Stack, Typography, Card, CardContent, Chip, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DescriptionIcon from "@mui/icons-material/Description";

const features = [
  {
    icon: <DescriptionIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "מחולל מכתבים חכם",
    description: "מכתב מקצועי ומכבד תוך דקות. התאמה אוטומטית לפי סוג הרשות והמצב שלך.",
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "AI לשיפור ניסוח",
    description: "שיפור אוטומטי של הניסוח, תיקון שגיאות, והתאמה לטון המתאים.",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "100% פרטי ובטוח",
    description: "כל המידע נשמר אצלכם בלבד. אין שליחה אוטומטית, אין שיתוף נתונים.",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "מהיר ופשוט",
    description: "תוך 5 דקות יש לך מכתב מוכן. בלי בירוקרטיה, בלי סיבוכים.",
  },
  {
    icon: <AttachMoneyIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "חינמי לחלוטין",
    description: "ללא עלויות נסתרות, ללא מנויים, ללא הגבלות. תמיד חינם.",
  },
  {
    icon: <CheckCircleIcon sx={{ fontSize: 40, color: "primary.main" }} />,
    title: "תוצאות מוכחות",
    description: "משתמשים דיווחו על שיפור משמעותי בסיכוי לקבל מענה.",
  },
];

const stats = [
  { number: "10,000+", label: "מכתבים שנוצרו" },
  { number: "95%", label: "שיעור הצלחה" },
  { number: "5 דקות", label: "זמן ממוצע ליצירה" },
  { number: "100%", label: "חינם תמיד" },
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: "calc(100dvh - 72px)" }}>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, rgba(15, 118, 110, 0.08) 0%, rgba(30, 64, 175, 0.12) 100%), radial-gradient(900px 500px at 50% 20%, rgba(30, 64, 175, 0.14), transparent 60%)",
          py: { xs: 6, md: 10 },
          px: 2,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4} sx={{ textAlign: "center", alignItems: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <Box
                component="img"
                src="/migdal.png"
                alt="לוגו מגדלור"
                sx={{
                  width: { xs: 120, sm: 150 },
                  height: { xs: 120, sm: 150 },
                  borderRadius: 4,
                  boxShadow: "0 20px 60px rgba(15, 118, 110, 0.3)",
                  animation: "float 3s ease-in-out infinite",
                  "@keyframes float": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                  },
                }}
              />
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                lineHeight: 1.2,
                fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
                background: "linear-gradient(135deg, #0F766E 0%, #1E40AF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
              }}
            >
              אתם לא לבד
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: "text.primary",
                fontWeight: 700,
                lineHeight: 1.4,
                fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
                maxWidth: 700,
              }}
            >
              מגיע לכם מענה – נעזור לכם לכתוב נכון
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                lineHeight: 1.6,
                maxWidth: 600,
                fontSize: { xs: "1rem", sm: "1.125rem" },
              }}
            >
              כלי פשוט וחכם ליצירת מכתבים מקצועיים לרשויות. חינמי, פרטי, ומוכח.
            </Typography>

            {/* Stats */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, 1fr)" },
                gap: 3,
                width: "100%",
                maxWidth: 800,
                mt: 2,
              }}
            >
              {stats.map((stat) => (
                <Box key={stat.label} sx={{ textAlign: "center" }}>
                  <Typography variant="h4" sx={{ fontWeight: 900, color: "primary.main", mb: 0.5 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* CTA Buttons */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "center", pt: 2, width: "100%", maxWidth: 500 }}
            >
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate("/letters")}
                sx={{
                  minWidth: { xs: "100%", sm: 220 },
                  py: 1.75,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(15, 118, 110, 0.4)",
                  "&:hover": {
                    boxShadow: "0 12px 32px rgba(15, 118, 110, 0.5)",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                התחל עכשיו – חינם
              </Button>
              <Button
                size="large"
                variant="outlined"
                onClick={() => navigate("/w")}
                sx={{
                  minWidth: { xs: "100%", sm: 220 },
                  py: 1.75,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderRadius: 3,
                  borderWidth: 2,
                }}
              >
                בדיקת זכויות
              </Button>
            </Stack>

            <Chip
              label="✓ ללא הרשמה • ✓ ללא תשלום • ✓ 100% פרטי"
              color="success"
              sx={{ mt: 1, fontWeight: 600, py: 2.5, fontSize: "0.95rem" }}
            />
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, px: 2, bgcolor: "background.default" }}>
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
                למה לבחור במגדלור?
              </Typography>
              <Typography variant="h6" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
                כל מה שצריך כדי לקבל מענה מהרשויות – במקום אחד, חינם, ופשוט
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                gap: 3,
              }}
            >
              {features.map((feature, index) => (
                <Card
                  key={index}
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    },
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: "center" }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Trust Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, px: 2, bgcolor: "background.paper" }}>
        <Container maxWidth="md">
          <Card
            sx={{
              bgcolor: "primary.dark",
              color: "common.white",
              p: { xs: 3, md: 5 },
              borderRadius: 4,
              textAlign: "center",
            }}
          >
            <Stack spacing={3}>
              <Typography variant="h4" sx={{ fontWeight: 900 }}>
                כל מה שצריך – בלי מה שלא צריך
              </Typography>
              <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />
              <Stack spacing={2}>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
                  ✓ <strong>חינמי לחלוטין</strong> – ללא עלויות, ללא מנויים, ללא הגבלות
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
                  ✓ <strong>100% פרטי</strong> – כל המידע נשמר אצלכם בלבד. אין שליחה אוטומטית
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
                  ✓ <strong>פשוט ומהיר</strong> – תוך 5 דקות יש לך מכתב מוכן לשליחה
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: "1.1rem" }}>
                  ✓ <strong>מוכח ויעיל</strong> – משתמשים מדווחים על שיפור משמעותי בסיכוי לקבל מענה
                </Typography>
              </Stack>
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate("/letters")}
                sx={{
                  bgcolor: "common.white",
                  color: "primary.dark",
                  py: 1.5,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  borderRadius: 3,
                  mt: 2,
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.9)",
                    transform: "scale(1.05)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                התחל עכשיו – חינם
              </Button>
            </Stack>
          </Card>
        </Container>
      </Box>

      {/* Disclaimer */}
      <Box sx={{ py: 4, px: 2, bgcolor: "background.default" }}>
        <Container maxWidth="md">
          <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "center", lineHeight: 1.8 }}>
            <strong>חשוב לדעת:</strong> האפליקציה אינה מהווה ייעוץ משפטי. היא כלי עזר ליצירת מכתבים מקצועיים.
            מומלץ להיוועץ באנשי מקצוע מתאימים כאשר נדרש.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
