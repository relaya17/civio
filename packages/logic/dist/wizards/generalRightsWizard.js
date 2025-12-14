/**
 * שאלון כללי לזיהוי נושא הזכויות
 * שאלות פשוטות וברורות שמכוונות את המשתמש לנושא הנכון
 * מיועד לאנשים עם קשיים - פשוט, ברור, עם אפשרות "לא בטוחה"
 */
export const generalRightsWizard = {
    id: "general-rights.v1",
    title: "בדיקת זכויות - שאלון קצר",
    description: "נעזור לך למצוא אילו זכויות עשויות להיות רלוונטיות עבורך. נשאל כמה שאלות פשוטות.",
    disclaimer: {
        short: "מידע כללי בלבד (לא ייעוץ משפטי)",
        full: "מגדלור מספקת מידע כללי בלבד ואינה מהווה ייעוץ משפטי, חוות דעת או תחליף לעורך דין. ייתכן שהדין תלוי בפרטים נוספים.",
    },
    steps: [
        {
            id: "main-issue",
            title: "מה הנושא?",
            question: "מה הנושא העיקרי שבו את צריכה עזרה?",
            whyAsking: "נבחר את הנושא המתאים כדי לכוון אותך לזכויות הרלוונטיות.",
            options: [
                { value: "work", label: "עבודה" },
                { value: "housing", label: "דיור" },
                { value: "money", label: "כסף / קצבאות" },
                { value: "health", label: "בריאות / נגישות" },
                { value: "family", label: "משפחה / רווחה" },
                { value: "legal", label: "משפטי" },
                { value: "not-sure", label: "לא בטוחה" },
            ],
        },
        {
            id: "work-situation",
            title: "מצב בעבודה",
            question: "מה המצב שלך בעבודה?",
            whyAsking: "לכל מצב יש זכויות שונות.",
            options: [
                { value: "fired", label: "פוטרתי" },
                { value: "resigned", label: "התפטרתי" },
                { value: "at-risk", label: "יש חשש לפיטורים" },
                { value: "wage-issue", label: "בעיה עם שכר" },
                { value: "not-working", label: "לא עובדת" },
                { value: "not-sure", label: "לא בטוחה" },
            ],
        },
        {
            id: "housing-situation",
            title: "מצב דיור",
            question: "מה המצב שלך עם דיור?",
            whyAsking: "נכוון אותך לזכויות דיור רלוונטיות.",
            options: [
                { value: "no-housing", label: "אין לי דיור" },
                { value: "public-housing", label: "דיור ציבורי / עמידר" },
                { value: "rent-problem", label: "בעיה עם שכר דירה" },
                { value: "maintenance", label: "בעיות תחזוקה" },
                { value: "not-sure", label: "לא בטוחה" },
            ],
        },
        {
            id: "money-situation",
            title: "מצב כלכלי",
            question: "מה המצב הכלכלי שלך?",
            whyAsking: "נכוון אותך לקצבאות וסיוע כלכלי.",
            options: [
                { value: "unemployed", label: "אבטלה" },
                { value: "low-income", label: "הכנסה נמוכה" },
                { value: "disability", label: "נכות" },
                { value: "elderly", label: "קשיש/ה" },
                { value: "single-parent", label: "הורה יחיד/ה" },
                { value: "not-sure", label: "לא בטוחה" },
            ],
        },
        {
            id: "health-situation",
            title: "מצב בריאות",
            question: "מה המצב הבריאותי שלך?",
            whyAsking: "נכוון אותך לזכויות בריאות ונגישות.",
            options: [
                { value: "mobility-issue", label: "בעיה בניידות / תו נכה" },
                { value: "disability", label: "נכות" },
                { value: "health-services", label: "צריך שירותי בריאות" },
                { value: "not-sure", label: "לא בטוחה" },
            ],
        },
        {
            id: "family-situation",
            title: "מצב משפחתי",
            question: "מה המצב המשפחתי שלך?",
            whyAsking: "נכוון אותך לזכויות משפחה ורווחה.",
            options: [
                { value: "children", label: "יש לי ילדים" },
                { value: "elderly-care", label: "מטפלת בקשיש/ה" },
                { value: "violence", label: "אלימות במשפחה" },
                { value: "single-parent", label: "הורה יחיד/ה" },
                { value: "not-sure", label: "לא בטוחה" },
            ],
        },
        {
            id: "legal-situation",
            title: "מצב משפטי",
            question: "מה הבעיה המשפטית שלך?",
            whyAsking: "נכוון אותך לסיוע משפטי.",
            options: [
                { value: "need-lawyer", label: "צריכה עורך דין" },
                { value: "appeal", label: "צריכה לערער" },
                { value: "complaint", label: "צריכה להגיש תלונה" },
                { value: "legal-aid", label: "צריכה סיוע משפטי מהמדינה" },
                { value: "not-sure", label: "לא בטוחה" },
            ],
        },
    ],
    sources: [
        {
            title: "כל-זכות - מאגר זכויות מקיף",
            url: "https://www.kolzchut.org.il",
            lastReviewedISODate: "2025-01-20",
        },
        {
            title: "Gov.il - פורטל שירותים ממשלתי",
            url: "https://www.gov.il",
            lastReviewedISODate: "2025-01-20",
        },
        {
            title: "ביטוח לאומי - אתר רשמי",
            url: "https://www.btl.gov.il",
            lastReviewedISODate: "2025-01-20",
        },
    ],
};
