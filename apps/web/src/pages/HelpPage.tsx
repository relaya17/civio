import { Container, Stack, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Card, CardContent } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const faqs = [
  {
    question: "איך יוצרים מכתב?",
    answer: "בחרי רשות וסוג מכתב, מלאי את הפרטים הנדרשים, בחרי טון ודחיפות, והמכתב ייווצר אוטומטית. אפשר לערוך ידנית לפני השמירה.",
  },
  {
    question: "האם המכתב נשלח אוטומטית?",
    answer: "לא. המכתב נשמר אצלכם בלבד. אתם מעתיקים אותו ושולחים בעצמכם דרך המייל, הדואר, או כל דרך אחרת.",
  },
  {
    question: "מה ההבדל בין טון עדין, רשמי, ורשמי+משפטי?",
    answer:
      "טון עדין = מכבד ולא מאיים, מומלץ לפניות ראשונות. טון רשמי = סטנדרטי ומקצועי. טון רשמי+משפטי = כולל אזכורים משפטיים רכים שמחזקים את הבקשה (כמו 'חובת מענה', 'מינהל תקין').",
  },
  {
    question: "מה זה 'מצב' במכתב?",
    answer:
      "המצב עוזר להתאים את הניסוח: פנייה ראשונית = מכבד, אין מענה = יותר תקיף, ערעור = מקצועי עם נימוקים, התראה = אזהרה עדינה.",
  },
  {
    question: "איך משתמשים בתזכורות?",
    answer:
      "אחרי שמירת מכתב, המערכת בודקת אוטומטית אם עברו 14+ ימים ללא מענה. תקבלי התראה עם המלצה לשלוח תזכורת.",
  },
  {
    question: "האם המידע שלי פרטי?",
    answer:
      "כן, 100%. כל המידע נשמר רק בדפדפן שלכם (localStorage). אין שליחה לשרת, אין שיתוף נתונים, אין מעקב.",
  },
  {
    question: "מה לעשות אם לא קיבלתי מענה?",
    answer:
      "אפשר לשלוח תזכורת (אחרי 14 יום), לפנות לגורם בכיר יותר, או לשלוח מכתב ערעור. המערכת תזכיר לך מתי לשלוח תזכורת.",
  },
  {
    question: "איך משפרים את המכתב עם AI?",
    answer:
      "בשלב הפריוויו, לחצי על 'שיפור ניסוח (AI)'. המערכת תשפר את הניסוח, תתקן שגיאות, ותתאים את הטון. (כרגע זה placeholder - בעתיד יחובר ל-API).",
  },
];

const tips = [
  {
    title: "למה חשוב לבחור מצב?",
    content:
      "הבחירה במצב עוזרת לנו להתאים את הניסוח והטון. מכתב 'אין מענה' יהיה יותר תקיף, בעוד מכתב 'פנייה ראשונית' יהיה יותר מכבד.",
  },
  {
    title: "איך משפטים משפטיים רכים עוזרים?",
    content:
      "משפטים כמו 'חובת מענה', 'מינהל תקין', 'זמן סביר' מחזקים את הבקשה בלי להיות מאיימים. הם מזכירים לרשות את החובות שלה.",
  },
  {
    title: "מתי להשתמש בטון עדין?",
    content: "טון עדין מומלץ לפניות ראשונות, כשהקשר טוב, או כשאת רוצה להיות מכבדת. טון רשמי+משפטי מומלץ כשיש עיכוב או אין מענה.",
  },
  {
    title: "למה לכתוב תאריכים?",
    content:
      "תאריכים עוזרים לבנות מכתב מדויק יותר. המערכת משתמשת בהם ליצירת משפטים כמו 'בתאריך X פניתי' או 'למרות פניות חוזרות בתאריכים Y ו-Z'.",
  },
];

export function HelpPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Box sx={{ textAlign: "center" }}>
          <QuestionAnswerIcon sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 2 }}>
            עזרה ושאלות נפוצות
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            כל מה שצריך לדעת כדי להשתמש במגדלור ביעילות
          </Typography>
        </Box>

        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, display: "flex", alignItems: "center", gap: 1 }}>
            <HelpOutlineIcon /> שאלות נפוצות
          </Typography>
          <Stack spacing={2}>
            {faqs.map((faq, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: 700 }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ color: "text.secondary", lineHeight: 1.8 }}>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
            טיפים לשימוש יעיל
          </Typography>
          <Stack spacing={2}>
            {tips.map((tip, index) => (
              <Card key={index} variant="outlined">
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                    {tip.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                    {tip.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>

        <Card sx={{ bgcolor: "primary.dark", color: "common.white", p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            עדיין יש שאלות?
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
            האפליקציה בנויה להיות פשוטה ואינטואיטיבית. אם משהו לא ברור, נסי לחזור לדף הבית ולקרוא את ההסברים שם, או
            פשוט להתחיל ליצור מכתב – התהליך מודרך ופשוט.
          </Typography>
        </Card>
      </Stack>
    </Container>
  );
}
