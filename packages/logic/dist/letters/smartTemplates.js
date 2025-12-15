// מאגר משפטים חכמים
export const LEGAL_SOFT_SENTENCES = [
    "בהסתמך על עקרונות המינהל התקין וזכות האזרח לקבל מענה מרשות ציבורית,",
    "בהתאם לחובת הרשות לפעול בשקיפות ובסבירות,",
    "בהסתמך על חובת רשות ציבורית להשיב לפניות אזרחים,",
    "בהתאם לכללי המינהל התקין,",
    "בהסתמך על זכות האזרח לקבל מענה תוך זמן סביר,",
];
export const NO_RESPONSE_SENTENCES = [
    "למרות פניות חוזרות, טרם התקבל מענה מסודר או מנומק.",
    "חרף פניותיי, לא נמסרה לי כל התייחסות עניינית.",
    "למרות פניות אלו, טרם התקבל מענה מסודר.",
    "חרף פניות קודמות, לא נמסרה לי תשובה עניינית.",
];
export const IMPACT_SENTENCES = [
    "היעדר המענה גורם לי קושי ממשי בהתנהלות ופוגע ביכולתי למצות את זכויותיי.",
    "מצב זה מקשה עליי ומעמיד אותי בחוסר ודאות מתמשך.",
    "הדבר גורם לי קושי ממשי בהתנהלות היומיומית.",
    "היעדר מענה פוגע ביכולתי למצות את זכויותיי.",
];
// תבניות לפי גוף ציבורי
export function getBodyTemplate(authorityId, topic, firstDate) {
    const formattedDate = formatDate(firstDate);
    switch (authorityId) {
        case "municipality":
            return `אני פונה אליכם בנוגע ל${topic}, אשר התרחש בתאריך ${formattedDate}.`;
        case "national-insurance":
            return `בתאריך ${formattedDate} הגשתי פנייה/תביעה בנושא ${topic}.`;
        case "health-fund":
            return `אני פונה אליכם בנוגע לנושא רפואי/אדמיניסטרטיבי הקשור ל${topic}.`;
        case "general":
        case "housing-ministry":
        case "welfare-bureau":
        case "amidar":
        case "state-comptroller":
            return `בתאריך ${formattedDate} פניתי אליכם בנושא ${topic}.`;
        default:
            return `אני פונה אליכם בנוגע ל${topic}, אשר התרחש בתאריך ${formattedDate}.`;
    }
}
// פונקציית עזר לבחירה אקראית
export function random(arr) {
    if (arr.length === 0)
        throw new Error("Cannot select from empty array");
    return arr[Math.floor(Math.random() * arr.length)];
}
// פונקציית עזר לעיצוב תאריך
export function formatDate(dateISO) {
    if (!dateISO)
        return "___";
    try {
        const date = new Date(dateISO);
        return date.toLocaleDateString("he-IL", { year: "numeric", month: "long", day: "numeric" });
    }
    catch {
        return dateISO;
    }
}
// בחירת פתיח לפי טון
export function getOpenerByTone(tone = "formal") {
    if (tone === "soft") {
        return "אני פונה אליכם בבקשה לקבל מענה בנושא המפורט להלן.";
    }
    if (tone === "formal-legal") {
        return "אבקש את התייחסותכם לפנייתי בעניין שלהלן.";
    }
    return "שלום רב,";
}
// בחירת סגירה לפי טון
export function getClosingByTone(tone = "formal") {
    if (tone === "soft") {
        return "בתודה מראש,";
    }
    if (tone === "formal-legal") {
        return "בכבוד רב,";
    }
    return "בברכה,";
}
// בחירת בקשה לפי דחיפות וטון
export function getRequestByUrgency(urgency, tone = "formal") {
    if (urgency === "high") {
        return tone === "soft"
            ? "אבקש טיפול דחוף ומענה בהקדם האפשרי."
            : "אבקש טיפול דחוף ומענה מנומק בהקדם האפשרי.";
    }
    return tone === "soft"
        ? "אבקש לקבל מענה בכתב בהקדם האפשרי."
        : "אבקש לקבל התייחסות ומענה בכתב.";
}
