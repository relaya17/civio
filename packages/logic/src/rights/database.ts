import type { RightCategory, RightItem, RightsAuthority, RightsTopic } from "@repo/types";

export const RIGHTS_AUTHORITIES: readonly RightsAuthority[] = [
  { id: "labor", label: "עבודה", description: "פיטורים, שכר, תנאים סוציאליים" },
  { id: "housing-ministry", label: "משרד הבינוי והשיכון", description: "דיור ציבורי, סיוע בשכר דירה, עררים" },
  { id: "amidar", label: "עמידר", description: "ניהול/תחזוקת דיור ציבורי ופניות דיירים" },
  { id: "welfare-bureau", label: "רווחה (עירייה/מועצה)", description: "סיוע ותמיכות דרך שירותים חברתיים" },
  { id: "legal-aid", label: "סיוע משפטי מטעם המדינה", description: "בדיקת זכאות ופתיחת בקשה" },
  { id: "national-insurance", label: "ביטוח לאומי", description: "קצבאות, ועדות, זכאות ועררים" },
  { id: "health-ministry", label: "משרד הבריאות", description: "שירותים, ועדות/נהלים, הכוונה" },
  { id: "transport-ministry", label: "משרד התחבורה", description: "תו חניה לנכה ושירותי תחבורה" },
  { id: "rehabilitation-authority", label: "רשות לשיקום האסיר", description: "תוכניות שיקום והכוונה לאסירים משוחררים" },
  { id: "education-ministry", label: "משרד החינוך", description: "זכויות חינוך, סיוע לימודים, תמיכות" },
  { id: "immigration-ministry", label: "משרד העלייה והקליטה", description: "זכויות עולים, קליטה, סיוע" },
  { id: "disability-commission", label: "נציבות שוויון זכויות לאנשים עם מוגבלות", description: "זכויות נגישות, אפליה, שוויון" },
  { id: "equal-rights-commission", label: "נציבות שוויון זכויות", description: "זכויות שוויון, מניעת אפליה" },
] as const;

export const RIGHTS_CATEGORIES: readonly RightCategory[] = [
  { id: "labor", label: "עבודה והעסקה", description: "זכויות בעבודה, שכר, פיטורים, תנאים סוציאליים" },
  { id: "housing", label: "דיור", description: "דיור ציבורי, עמידר, סיוע בשכר דירה, זכויות דיירים" },
  { id: "welfare", label: "רווחה ושירותים חברתיים", description: "שירותים חברתיים, סיוע ותוכניות, לשכות רווחה" },
  { id: "legal-aid", label: "סיוע משפטי", description: "סיוע משפטי מטעם המדינה והכוונה" },
  { id: "national-insurance", label: "ביטוח לאומי", description: "קצבאות, ועדות, זכאות ועררים, אבטלה, נכות" },
  { id: "health-mobility", label: "בריאות · ניידות · תו נכה", description: "ניידות, תו חניה לנכה, זכויות נגישות, קופות חולים" },
  { id: "rehabilitation", label: "שיקום אסיר משוחרר", description: "שיקום והכוונה לאחר שחרור" },
  { id: "homelessness", label: "דיירי רחוב / חסרי בית", description: "סיוע מיידי, רווחה, דיור ושיקום בקהילה" },
  { id: "women-rights", label: "זכויות נשים", description: "זכויות נשים, אלימות במשפחה, זכויות אימהות, שוויון מגדרי" },
  { id: "children-rights", label: "זכויות ילדים", description: "זכויות ילדים, חינוך, רווחה, הגנה" },
  { id: "elderly-rights", label: "זכויות קשישים", description: "זכויות קשישים, קצבאות, שירותים, דיור מוגן" },
  { id: "disability-rights", label: "זכויות אנשים עם מוגבלות", description: "זכויות נגישות, שוויון, תמיכות, קצבאות" },
  { id: "immigration-rights", label: "זכויות עולים וזרים", description: "זכויות עולים, קליטה, עובדים זרים, מעמד" },
  { id: "education-rights", label: "זכויות חינוך", description: "זכויות חינוך, סיוע לימודים, תמיכות, שילוב" },
] as const;

export const RIGHTS_TOPICS: readonly RightsTopic[] = [
  { id: "labor-termination", label: "פיטורים והתפטרות", authorityIds: ["labor"] },
  { id: "labor-wages", label: "שכר ותלוש", authorityIds: ["labor"] },
  { id: "housing-public", label: "דיור ציבורי", authorityIds: ["housing-ministry", "amidar"] },
  { id: "housing-rent-assistance", label: "סיוע בשכר דירה", authorityIds: ["housing-ministry"] },
  { id: "housing-amidar", label: "עמידר – תחזוקה/פניות דיירים", authorityIds: ["amidar"] },
  { id: "welfare-support", label: "רווחה – סיוע ושירותים", authorityIds: ["welfare-bureau"] },
  { id: "legal-aid", label: "סיוע משפטי מהמדינה", authorityIds: ["legal-aid"] },
  { id: "btl-disability", label: "נכות (ביטוח לאומי)", authorityIds: ["national-insurance"] },
  { id: "btl-mobility", label: "ניידות (ביטוח לאומי)", authorityIds: ["national-insurance", "health-ministry"] },
  { id: "parking-badge", label: "תו חניה לנכה", authorityIds: ["transport-ministry"] },
  { id: "rehabilitation-ex-prisoner", label: "שיקום אסיר משוחרר", authorityIds: ["rehabilitation-authority", "national-insurance"] },
  { id: "homeless-support", label: "דיירי רחוב / חסרי בית", authorityIds: ["welfare-bureau", "housing-ministry", "national-insurance"] },
] as const;

// חשוב: התוכן כאן הוא מידע כללי + קישורים למקורות. לא "פסק דין" ולא ייעוץ משפטי.
export const RIGHTS_ITEMS: readonly RightItem[] = [
  {
    id: "labor-termination-notice",
    categoryId: "labor",
    authorityId: "labor",
    topicId: "labor-termination",
    title: "הודעה מוקדמת לפיטורים/התפטרות",
    summary: "במקרים רבים יש חובה לתת הודעה מוקדמת. משך ההודעה תלוי בוותק, סוג ההעסקה ובנסיבות.",
    steps: [
      "אספי את פרטי ההעסקה: תאריך התחלה, סוג משרה, שכר, ותק.",
      "בדקי מהו משך ההודעה המוקדמת הרלוונטי למקרה שלך במקור הרשמי/מרכז מידע.",
      "אם לא ניתנה הודעה מוקדמת כנדרש—שמרי תיעוד ובקשי תיקון/תשלום חלף הודעה מוקדמת.",
    ],
    notes: "כללים משתנים לפי ותק, סוג חוזה ונסיבות. השתמשי במקורות למטה או התייעצי.",
    sources: [
      { title: "כל-זכות: הודעה מוקדמת לפיטורים ולהתפטרות", url: "https://www.kolzchut.org.il/he/%D7%94%D7%95%D7%93%D7%A2%D7%94_%D7%9E%D7%95%D7%A7%D7%93%D7%9E%D7%AA_%D7%9C%D7%A4%D7%99%D7%98%D7%95%D7%A8%D7%99%D7%9D_%D7%95%D7%9C%D7%94%D7%AA%D7%A4%D7%98%D7%A8%D7%95%D7%AA", publisher: "כל-זכות" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["פיטורים", "התפטרות"],
    keywords: ["הודעה מוקדמת", "פיטורים", "התפטרות", "סיום עבודה", "ותק", "חוזה עבודה", "זכויות עובד"],
    faqs: [
      {
        question: "כמה זמן הודעה מוקדמת מגיע לי?",
        answer: "משך ההודעה המוקדמת תלוי בוותק שלך במקום העבודה. בדרך כלל: עד שנה - יום אחד לכל חודש, שנה עד 5 שנים - שבועיים, מעל 5 שנים - חודש. חשוב לבדוק את החוזה הספציפי שלך.",
      },
      {
        question: "מה קורה אם המעסיק לא נתן לי הודעה מוקדמת?",
        answer: "אם המעסיק לא נתן הודעה מוקדמת כנדרש, ייתכן שתזכאי לתשלום חלף הודעה מוקדמת. שמרי תיעוד ופני למעסיק בכתב. אם אין מענה, שקלי פנייה לארגון עובדים או ייעוץ משפטי.",
      },
    ],
    commonScenarios: [
      "פיטורים ללא הודעה מוקדמת",
      "התפטרות עם הודעה מוקדמת קצרה",
      "סיום חוזה עבודה קבוע",
      "פיטורים בעת הריון או חופשת לידה",
      "פיטורים בגלל גיל",
    ],
    eligibilityCriteria: [
      "עובד/ת שכיר/ה במשכורת",
      "עובד/ת עם חוזה עבודה",
      "ותק במקום העבודה",
    ],
    relatedRightsIds: ["labor-severance-pay", "labor-payslip"],
    aiContext: "זכות זו עוסקת בחובת המעסיק או העובד לתת הודעה מוקדמת לפני סיום יחסי העבודה. משך ההודעה משתנה לפי ותק, סוג ההעסקה (קבוע/זמני), ונסיבות מיוחדות. במקרה של פיטורים ללא הודעה מוקדמת, העובד עשוי להיות זכאי לתשלום חלף הודעה מוקדמת. זכות זו קשורה לזכויות נוספות כמו פיצויי פיטורים ותלוש שכר.",
  },
  {
    id: "labor-severance-pay",
    categoryId: "labor",
    authorityId: "labor",
    topicId: "labor-termination",
    title: "פיצויי פיטורים (כללי)",
    summary: "במקרים רבים קיימת זכאות לפיצויי פיטורים או רכיבים חלופיים לפי הסדרים שונים. הזכאות תלויה בנסיבות.",
    steps: [
      "בדקי האם מדובר בפיטורים/התפטרות בדין מפוטר/סיום חוזה—ומה הסיבה.",
      "אספי תלושי שכר, חוזה עבודה, והפרשות פנסיוניות.",
      "אם יש פער/מחלוקת—פני למעסיק בכתב ובקשי פירוט וחישוב.",
    ],
    sources: [
      { title: "כל-זכות: פיצויי פיטורים", url: "https://www.kolzchut.org.il/he/%D7%A4%D7%99%D7%A6%D7%95%D7%99%D7%99_%D7%A4%D7%99%D7%98%D7%95%D7%A8%D7%99%D7%9D", publisher: "כל-זכות" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["פיצויים", "סיום עבודה"],
  },
  {
    id: "labor-payslip",
    categoryId: "labor",
    authorityId: "labor",
    topicId: "labor-wages",
    title: "תלוש שכר ופירוט תשלומים",
    summary: "במקרים רבים קיימת זכות לקבל תלוש שכר ופירוט רכיבים. חוסר פירוט/טעויות—שווה בדיקה ותיעוד מול המקורות.",
    steps: [
      "שמרי תלושים/העברות בנקאיות והסכמים.",
      "סמני רכיבים לא ברורים (שעות, ניכויים, ימי חופשה/מחלה).",
      "בקשי מהמעסיק הבהרה/תיקון בכתב ושמרי עותק.",
    ],
    sources: [
      { title: "כל-זכות: תלוש שכר", url: "https://www.kolzchut.org.il/he/%D7%AA%D7%9C%D7%95%D7%A9_%D7%A9%D7%9B%D7%A8", publisher: "כל-זכות" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["שכר", "תלוש"],
  },
  {
    id: "housing-public-overview",
    categoryId: "housing",
    authorityId: "housing-ministry",
    topicId: "housing-public",
    title: "דיור ציבורי – הכוונה בסיסית והגשת בקשה",
    summary: "דיור ציבורי מנוהל דרך משרד הבינוי והשיכון וחברות משכנות. יש הליך בדיקת זכאות ותיעוד, בכפוף לקריטריונים.",
    steps: [
      "אספי מסמכים: תעודות זהות, הרכב משפחה, הכנסות, מצב דיור נוכחי, מסמכים רפואיים אם רלוונטי.",
      "בדקי את מסלול הבקשה/זכאות באתר משרד הבינוי והשיכון והכיני רשימת מסמכים חסרים.",
      "הגישי בקשה ושמרי מספר פנייה/תיק. בקשי לקבל מסמך שמאשר קבלה.",
    ],
    sources: [
      { title: "gov.il – משרד הבינוי והשיכון (דפי שירות/מידע)", url: "https://www.gov.il/he/departments/ministry_of_construction_and_housing", publisher: "ממשלת ישראל" },
      { title: "כל-זכות: דיור ציבורי (מידע כללי)", url: "https://www.kolzchut.org.il/he/%D7%93%D7%99%D7%95%D7%A8_%D7%A6%D7%99%D7%91%D7%95%D7%A8%D7%99", publisher: "כל-זכות" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["דיור", "זכאות"],
  },
  {
    id: "housing-rent-assistance",
    categoryId: "housing",
    authorityId: "housing-ministry",
    topicId: "housing-rent-assistance",
    title: "סיוע בשכר דירה – כיוון פעולה",
    summary: "יש מסלולים לסיוע בשכר דירה בהתאם לקריטריונים. חשוב לעבוד עם מסמכים ותיעוד ולבדוק במקור הרשמי מה רלוונטי.",
    steps: [
      "אספי: חוזה שכירות, הכנסות, מצב משפחתי, אישורים רפואיים/סוציאליים אם יש.",
      "בדקי באתר משרד הבינוי והשיכון מה הקריטריונים והיכן מגישים בקשה (לרוב דרך סניפים/גורמים מורשים).",
      "אם נדחית—בקשי נימוק בכתב ושקלי ערר/השגה לפי ההנחיות.",
    ],
    sources: [
      { title: "gov.il – משרד הבינוי והשיכון (מידע ושירותים)", url: "https://www.gov.il/he/departments/ministry_of_construction_and_housing", publisher: "ממשלת ישראל" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["שכר דירה", "סיוע"],
  },
  {
    id: "amidar-maintenance",
    categoryId: "housing",
    authorityId: "amidar",
    topicId: "housing-amidar",
    title: "עמידר – פנייה לתחזוקה/ליקויים בדירה (תיעוד נכון)",
    summary: "במקרים של ליקויים בדירה חשוב לפנות בכתב, לתעד, ולבקש מספר פנייה/זמן טיפול.",
    steps: [
      "צלמי/תעדיי את הליקוי (תאריך, תמונות/וידאו).",
      "פני לעמידר ובקשי מספר פנייה וזמני טיפול משוערים.",
      "אם אין מענה—שלחי תזכורת רשמית ושקלי פנייה גם למשרד הבינוי והשיכון/פניות הציבור לפי המקרה.",
    ],
    sources: [
      { title: "עמידר – אתר מידע/צור קשר", url: "https://www.amidar.co.il/", publisher: "עמידר" },
      { title: "gov.il – משרד הבינוי והשיכון", url: "https://www.gov.il/he/departments/ministry_of_construction_and_housing", publisher: "ממשלת ישראל" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["עמידר", "תחזוקה"],
  },
  {
    id: "welfare-bureau-support",
    categoryId: "welfare",
    authorityId: "welfare-bureau",
    topicId: "welfare-support",
    title: "רווחה – פנייה ללשכת רווחה וקבלת סיוע",
    summary: "לשכות רווחה מעניקות הכוונה/סיוע בהתאם למצב. חשוב להגיע עם מסמכים ותיאור ברור של הצורך.",
    steps: [
      "כתבי בקצרה: מה הבעיה, ממתי, מה ניסית כבר, ומה את מבקשת.",
      "אספי מסמכים: הכנסות, שכירות/משכנתא, מצב רפואי אם רלוונטי, מסמכי ילדים/מסגרות.",
      "בקשי פגישה עם עובד/ת סוציאלי/ת ושמרי תיעוד של החלטות וסיכומים.",
    ],
    sources: [
      { title: "gov.il – משרד הרווחה והביטחון החברתי", url: "https://www.gov.il/he/departments/ministry_of_welfare_and_social_affairs", publisher: "ממשלת ישראל" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["רווחה", "עו\"ס"],
  },
  {
    id: "legal-aid-apply",
    categoryId: "legal-aid",
    authorityId: "legal-aid",
    topicId: "legal-aid",
    title: "סיוע משפטי מטעם המדינה – איך מתחילים",
    summary: "קיים מנגנון סיוע משפטי (כפוף לזכאות) בתחומים שונים. ההתחלה היא בדיקת זכאות והגשת בקשה עם מסמכים.",
    steps: [
      "אספי מסמכים: הכנסות, מצב משפחתי, נכסים/התחייבויות, ותיאור ההליך/הבעיה.",
      "בדקי באתר משרד המשפטים כיצד מגישים בקשה ומה תנאי הזכאות.",
      "הגישי בקשה ושמרי מספר פנייה. אם יש דחיפות—צייני זאת והוסיפי מסמכים תומכים.",
    ],
    sources: [
      { title: "gov.il – סיוע משפטי (משרד המשפטים)", url: "https://www.gov.il/he/departments/legal_aid", publisher: "ממשלת ישראל" },
      { title: "כל-זכות: סיוע משפטי מטעם המדינה", url: "https://www.kolzchut.org.il/he/%D7%A1%D7%99%D7%95%D7%A2_%D7%9E%D7%A9%D7%A4%D7%98%D7%99_%D7%9E%D7%98%D7%A2%D7%9D_%D7%94%D7%9E%D7%93%D7%99%D7%A0%D7%94", publisher: "כל-זכות" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["סיוע משפטי", "זכאות"],
  },
  {
    id: "btl.disability.general",
    categoryId: "national-insurance",
    authorityId: "national-insurance",
    topicId: "btl-disability",
    title: "נכות כללית (ביטוח לאומי) – כיוון פעולה",
    summary: "ביטוח לאומי מטפל בתביעות נכות כללית לפי תנאי זכאות. חשוב לעבוד עם מסמכים רפואיים ותיעוד תפקודי.",
    steps: [
      "אספי מסמכים רפואיים עדכניים (סיכומים, בדיקות, תרופות) + תיאור תפקוד יומיומי.",
      "בדקי באתר ביטוח לאומי את תנאי הזכאות והמסמכים הנדרשים לפני הגשה.",
      "הגישי תביעה ושמרי מספר תביעה. בקשי החלטה/נימוקים בכתב במידת הצורך.",
    ],
    notes: "הזכאות והסכומים תלויים בנסיבות רפואיות/תעסוקתיות. מומלץ להסתמך על המקורות הרשמיים ולהתייעץ במידת הצורך.",
    sources: [
      { title: "ביטוח לאומי – אתר רשמי", url: "https://www.btl.gov.il/", publisher: "ביטוח לאומי" },
      { title: "כל-זכות: קצבת נכות כללית (מידע כללי)", url: "https://www.kolzchut.org.il/he/%D7%A7%D7%A6%D7%91%D7%AA_%D7%A0%D7%9B%D7%95%D7%AA_%D7%9B%D7%9C%D7%9C%D7%99%D7%AA", publisher: "כל-זכות" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["נכות", "ביטוח לאומי"],
  },
  {
    id: "btl.mobility.general",
    categoryId: "health-mobility",
    authorityId: "national-insurance",
    topicId: "btl-mobility",
    title: "ניידות (ביטוח לאומי) – כיוון פעולה",
    summary: "גמלת ניידות קשורה למצב רפואי ולהליך מול ביטוח לאומי (ולעיתים ועדות רפואיות). חשוב להבין את ההליך והמסמכים.",
    steps: [
      "אספי מסמכים רפואיים רלוונטיים למוגבלות ניידות (סיכומים, הדמיות, המלצות).",
      "בדקי באתר ביטוח לאומי את תנאי הזכאות והמסלול המתאים (כולל תיאום ועדה/בדיקה אם נדרש).",
      "שמרי כל מסמך שנמסר/התקבל והקפידי לבקש החלטה ונימוקים בכתב.",
    ],
    notes: "ההליך והקריטריונים משתנים לפי נסיבות. הסתמכי על המקורות הרשמיים.",
    sources: [
      { title: "ביטוח לאומי – אתר רשמי", url: "https://www.btl.gov.il/", publisher: "ביטוח לאומי" },
      { title: "כל-זכות: גמלת ניידות (מידע כללי)", url: "https://www.kolzchut.org.il/he/%D7%92%D7%9E%D7%9C%D7%AA_%D7%A0%D7%99%D7%99%D7%93%D7%95%D7%AA", publisher: "כל-זכות" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["ניידות", "ביטוח לאומי"],
  },
  {
    id: "transport.parking-badge",
    categoryId: "health-mobility",
    authorityId: "transport-ministry",
    topicId: "parking-badge",
    title: "תו חניה לנכה – כיוון פעולה",
    summary: "תו חניה לנכה מטופל מול משרד התחבורה. חשוב להגיש בקשה עם מסמכים רפואיים/תפקודיים רלוונטיים ולעקוב אחרי החלטה.",
    steps: [
      "אספי מסמכים רפואיים עדכניים והמלצות רלוונטיות.",
      "בדקי באתר משרד התחבורה את אופן ההגשה והמסמכים הנדרשים.",
      "אם הבקשה נדחתה—בקשי נימוקים בכתב ובדקי מסלול ערר/השלמת מסמכים.",
    ],
    sources: [
      { title: "gov.il – משרד התחבורה והבטיחות בדרכים", url: "https://www.gov.il/he/departments/ministry_of_transport_and_road_safety", publisher: "ממשלת ישראל" },
      { title: "כל-זכות: תו חניה לנכה (מידע כללי)", url: "https://www.kolzchut.org.il/he/%D7%AA%D7%95_%D7%97%D7%A0%D7%99%D7%94_%D7%9C%D7%A0%D7%9B%D7%94", publisher: "כל-זכות" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["תו נכה", "חניה", "נגישות"],
  },
  {
    id: "rehab.ex-prisoner.start",
    categoryId: "rehabilitation",
    authorityId: "rehabilitation-authority",
    topicId: "rehabilitation-ex-prisoner",
    title: "אסיר משוחרר – הכוונה לסיוע ושיקום",
    summary: "לאחר שחרור, ייתכן שקיימות זכויות בביטוח לאומי וסיוע שיקומי. מומלץ לפעול עם מסמכים ולבקש הכוונה רשמית.",
    steps: [
      "אספי אישור שחרור ותיעוד בסיסי (מועד שחרור, מצב תעסוקתי/דיור).",
      "בדקי בביטוח לאומי האם קיימת זכאות לסיוע (למשל הבטחת הכנסה בתקופה מסוימת, בכפוף לתנאים).",
      "פני לרשות לשיקום האסיר/גורמי שיקום בקהילה לקבלת תכנית הכוונה (תעסוקה/דיור/ליווי).",
    ],
    notes: "הזכויות תלויות במשך המאסר, מצב משפחתי והכנסות. הסתמכי על המקורות הרשמיים להחלטה.",
    sources: [
      { title: "ביטוח לאומי: זכויות אסיר משוחרר (מידע רשמי)", url: "https://www.btl.gov.il/ZcuyotAsdience/Pages/AsirMesocrrKy.aspx", publisher: "ביטוח לאומי" },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["אסיר משוחרר", "שיקום"],
  },
  {
    id: "homeless.first-steps",
    categoryId: "homelessness",
    authorityId: "welfare-bureau",
    topicId: "homeless-support",
    title: "דייר/ת רחוב – צעדים ראשונים לקבלת סיוע",
    summary:
      "במצבי חוסר דיור או סיכון מיידי, נקודת הכניסה המרכזית היא לשכת הרווחה ברשות המקומית. מומלץ להגיע עם מינימום מסמכים ולבקש מענה מיידי/הפניה למסגרת.",
    steps: [
      "פני ללשכת הרווחה בעיר/מועצה שבה את נמצאת ובקשי פגישה דחופה/מענה ראשוני.",
      "אם יש סכנת חיים/אלימות—פני גם למוקד חירום (100/101) בהתאם למצב.",
      "בקשי סיכום בכתב/מספר פנייה, ושמרי כל תיעוד.",
    ],
    notes:
      "המענים משתנים לפי עיר/מצב. המטרה כאן היא הכוונה ראשונית ותיעוד מסודר מול הגורם המטפל.",
    sources: [
      {
        title: "gov.il – משרד הרווחה והביטחון החברתי",
        url: "https://www.gov.il/he/departments/ministry_of_welfare_and_social_affairs",
        publisher: "ממשלת ישראל",
      },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["דיירי רחוב", "חסרי בית", "רווחה"],
  },
  {
    id: "homeless.rent-support-at-risk",
    categoryId: "homelessness",
    authorityId: "housing-ministry",
    topicId: "homeless-support",
    title: "סיוע בשכר דירה לאוכלוסיות בסיכון/חסרי בית – כיוון פעולה",
    summary:
      "קיימים מסלולים ייעודיים לסיוע בשכר דירה לאוכלוסיות בסיכון (כולל חסרי בית), בכפוף לתנאים ולתהליך הגשה. מומלץ להתחיל מהמידע הרשמי ולפעול עם מסמכים.",
    steps: [
      "אספי מסמכים בסיסיים (ת״ז, מצב משפחתי, הכנסות/אין הכנסות, אישורים מגורמי טיפול אם קיימים).",
      "בדקי בדף השירות הרשמי מה התנאים והיכן מגישים בקשה.",
      "במקביל, בקשי מלשכת הרווחה מכתב/אישור תומך אם זה נדרש במסלול.",
    ],
    sources: [
      {
        title: "gov.il – סיוע בשכר דירה לאוכלוסיות בסיכון",
        url: "https://www.gov.il/he/service/rent_support_at_risk",
        publisher: "ממשלת ישראל",
      },
    ],
    lastReviewedISO: "2025-12-13",
    tags: ["שכר דירה", "סיוע", "חסרי בית"],
  },
] as const;

export function getRightsAuthority(id: RightsAuthority["id"]) {
  const a = RIGHTS_AUTHORITIES.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown rights authority: ${id}`);
  return a;
}

export function getRightsTopic(id: RightsTopic["id"]) {
  const t = RIGHTS_TOPICS.find((x) => x.id === id);
  if (!t) throw new Error(`Unknown rights topic: ${id}`);
  return t;
}


