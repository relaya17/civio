import { Box, Container, Stack, Typography } from "@mui/material";

export function TermsPage() {
  return (
    <Container maxWidth="md" sx={{ pt: 4, pb: 6 }}>
      <Stack spacing={3}>
        <Typography variant="h4" style={{ fontWeight: "800" }}>
          תנאי שימוש והצהרת אי־אחריות
        </Typography>

        <Typography variant="body1">
          מגדלור – Civio (להלן: &quot;השירות&quot;) הוא שירות מידע כללי שנועד לסייע לציבור במיצוי זכויות
          מול רשויות וגופים ציבוריים. השימוש בשירות הוא חינמי ואינו מהווה תחליף לייעוץ משפטי מקצועי.
        </Typography>

        <Stack spacing={2}>
          <Box>
            <Typography variant="h6" style={{ fontWeight: "700" }}>
              1. אופי השירות
            </Typography>
            <Typography variant="body2">
              השירות מספק מידע כללי, שאלונים, מאגר זכויות ומחולל מכתבים. המידע מבוסס על מקורות ציבוריים ועל
              ידע מצטבר, אך הוא עשוי שלא להיות מעודכן או שלם בכל עת.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" style={{ fontWeight: "700" }}>
              2. אין ייעוץ משפטי
            </Typography>
            <Typography variant="body2">
              המידע, ההמלצות והמסמכים המופקים באמצעות השירות אינם מהווים ייעוץ משפטי, אינם מחליפים ייעוץ של
              עורך דין או גורם מקצועי מוסמך, ואינם יוצרים קשר עו&quot;ד־לקוח או כל יחסי נאמנות אחרים.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" style={{ fontWeight: "700" }}>
              3. אחריות המשתמש
            </Typography>
            <Typography variant="body2">
              האחריות לשימוש במידע ובמסמכים הנוצרים באמצעות השירות מוטלת על המשתמש בלבד. מומלץ בכל מקרה של
              ספק, מורכבות, הליך משפטי או פגיעה בזכויות להיוועץ בעורך דין או בגורם מקצועי מוסמך.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" style={{ fontWeight: "700" }}>
              4. הגבלת אחריות
            </Typography>
            <Typography variant="body2">
              מפעילי השירות אינם אחראים לכל נזק ישיר או עקיף, כספי או אחר, שייגרם עקב הסתמכות על המידע, על
              השאלונים, על המכתבים או על כל רכיב אחר בשירות, לרבות טעויות, עדכונים חסרים, שינויי חקיקה או
              מדיניות רשויות.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" style={{ fontWeight: "700" }}>
              5. פרטיות ושמירת מידע
            </Typography>
            <Typography variant="body2">
              השירות שואף לצמצם את איסוף ושמירת המידע האישי למינימום הנדרש לפעילות התקינה. חלק מהמידע (למשל
              טיוטות מכתבים) נשמר מקומית בדפדפן המשתמש בלבד. אין לשתף בשדות החופשיים מידע רפואי, סודי או מזהה
              מעבר לנדרש.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" style={{ fontWeight: "700" }}>
              6. פעילות בשבת
            </Typography>
            <Typography variant="body2">
              השירות כולל מנגנון המגביל פעולות אינטראקטיביות בשבת (על בסיס זמן ישראל), לצורך כיבוד השבת.
              ייתכנו הבדלים בזמני החסימה בפועל עקב מאפייני תזמון טכניים.
            </Typography>
          </Box>

          <Box>
            <Typography variant="h6" style={{ fontWeight: "700" }}>
              7. שינויים בשירות
            </Typography>
            <Typography variant="body2">
              ייתכנו עדכונים לשירות, לתכניו ולתנאי השימוש מעת לעת. השימוש בשירות לאחר שינוי התנאים מהווה
              הסכמה לתנאים המעודכנים.
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}

