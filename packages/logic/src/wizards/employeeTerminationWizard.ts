import type { WizardDefinition } from "@repo/types";

export const employeeTerminationWizard: WizardDefinition = {
  id: "employee-termination.v1",
  title: "זכויות עובדים: פיטורים / שימוע (שאלון קצר)",
  description:
    "שאלון קצר עם בחירה בכפתורים כדי להבין אילו מסלולים אפשריים עבורך, ומה כדאי לבדוק בהמשך.",
  disclaimer: {
    short: "מידע כללי בלבד (לא ייעוץ משפטי)",
    full:
      "Civio מספקת מידע כללי בלבד ואינה מהווה ייעוץ משפטי, חוות דעת או תחליף לעורך דין. ייתכן שהדין תלוי בפרטים נוספים.",
  },
  steps: [
    {
      id: "employment-status",
      title: "סטטוס העסקה",
      question: "מה המצב כרגע?",
      whyAsking: "כדי להבין אם מדובר בפיטורים, התפטרות או שינוי תנאים—לכל אחד מסלולים שונים.",
      options: [
        { value: "fired", label: "פוטרתי" },
        { value: "resigned", label: "התפטרתי" },
        { value: "at-risk", label: "יש חשש לפיטורים / תהליך" },
        { value: "not-sure", label: "לא בטוח / לא יודע" },
      ],
    },
    {
      id: "hearing",
      title: "שימוע",
      question: "האם התקיים שימוע לפני פיטורים (או זומנת לשימוע)?",
      whyAsking: "כדי לבדוק אם התקיים תהליך מסודר, ומה כדאי לבקש בכתב.",
      options: [
        { value: "yes", label: "כן" },
        { value: "no", label: "לא" },
        { value: "not-sure", label: "לא בטוח / לא יודע" },
      ],
    },
    {
      id: "notice",
      title: "הודעה מוקדמת",
      question: "האם קיבלת הודעה מוקדמת (או תשלום במקום הודעה מוקדמת)?",
      whyAsking:
        "כדי להבין האם ייתכן שמגיע לך תשלום/השלמה, או שיש צורך לבדוק את תקופת ההודעה.",
      options: [
        { value: "yes", label: "כן" },
        { value: "no", label: "לא" },
        { value: "not-sure", label: "לא בטוח / לא יודע" },
      ],
    },
    {
      id: "severance",
      title: "פיצויי פיטורים",
      question: "האם קיבלת/הוצע לך טיפול בפיצויי פיטורים?",
      whyAsking: "כדי לזהות אם נדרש בירור נוסף מול המעסיק או מול גורם מוסמך.",
      options: [
        { value: "received", label: "כן, קיבלתי/י" },
        { value: "offered", label: "הוצע לי אבל לא הושלם" },
        { value: "no", label: "לא" },
        { value: "not-sure", label: "לא בטוח / לא יודע" },
      ],
    },
    {
      id: "documentation",
      title: "מסמכים",
      question: "האם יש לך מסמכים בסיסיים (חוזה/תלושים/מכתב פיטורים)?",
      whyAsking: "כדי לדעת עד כמה קל יהיה לאמת פרטים ולנסח פנייה רשמית.",
      options: [
        { value: "yes", label: "כן" },
        { value: "partial", label: "חלקית" },
        { value: "no", label: "לא" },
        { value: "not-sure", label: "לא בטוח / לא יודע" },
      ],
    },
  ],
  sources: [
    {
      title: "Gov.il – פורטל שירותים ומידע ממשלתי (זכויות עובדים)",
      url: "https://www.gov.il/he",
      lastReviewedISODate: "2025-12-13",
    },
    {
      title: "משרד העבודה – מידע ושירותים (Gov.il)",
      url: "https://www.gov.il/he/departments/ministry_of_labor/govil-landing-page",
      lastReviewedISODate: "2025-12-13",
    },
  ],
};


