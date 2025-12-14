import { getAuthority } from "./authorities.js";
import { getKind } from "./kinds.js";
function line(v) {
    return v && v.trim().length > 0 ? v.trim() : undefined;
}
function joinLines(lines) {
    return lines.filter((x) => typeof x === "string" && x.length > 0).join("\n");
}
export function generateLetter(input) {
    const authority = getAuthority(input.authorityId);
    const kind = getKind(input.kindId);
    const caseLine = line(input.caseNumber) ? `מס׳ תיק/פנייה: ${input.caseNumber}` : undefined;
    const header = joinLines([
        line(input.city) ? `${input.city}, ${input.dateISO}` : input.dateISO,
        "",
        authority.toLine,
        authority.addressLine,
        "",
        `הנדון: ${input.subject}`,
        caseLine,
        "",
    ]);
    const fromBlock = joinLines([
        `פרטי פונה: ${input.fullName}`,
        line(input.idNumber) ? `ת"ז: ${input.idNumber}` : undefined,
        line(input.address) ? `כתובת: ${input.address}` : undefined,
        line(input.phone) ? `טלפון: ${input.phone}` : undefined,
        line(input.email) ? `אימייל: ${input.email}` : undefined,
        "",
    ]);
    const body = joinLines([
        `שלום רב,`,
        "",
        `אני פונה אליכם בעניין: ${kind.label}.`,
        "",
        `רקע קצר:`,
        input.facts.trim(),
        "",
        `בקשה:`,
        input.request.trim(),
        "",
        line(input.attachments) ? `נספחים/מסמכים מצורפים (אם יש): ${input.attachments}` : undefined,
        "",
        kind.id === "request-documents"
            ? `אבקש לקבל את המסמכים/המידע המבוקשים או הנחיות ברורות כיצד לקבלם.`
            : `אודה להתייחסותכם ולעדכון בדבר הטיפול בפנייה.`,
        "",
        `בברכה,`,
        input.fullName,
    ]);
    const disclaimer = "הבהרה: מכתב זה נוצר באמצעות מגדלור לצורך ניסוח פורמלי. מגדלור מספקת מידע כללי בלבד ואינה מהווה ייעוץ משפטי.";
    return {
        subject: `פנייה ל-${authority.label}: ${input.subject}`,
        bodyText: `${header}${fromBlock}${body}`,
        disclaimer,
    };
}
