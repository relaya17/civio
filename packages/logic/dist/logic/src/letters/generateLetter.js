import { getAuthority } from "./authorities.js";
import { formatDate, getBodyTemplate, getClosingByTone, getOpenerByTone, getRequestByUrgency, IMPACT_SENTENCES, LEGAL_SOFT_SENTENCES, NO_RESPONSE_SENTENCES, random, } from "./smartTemplates.js";
function line(v) {
    return v && v.trim().length > 0 ? v.trim() : undefined;
}
function joinLines(lines) {
    return lines.filter((x) => typeof x === "string" && x.length > 0).join("\n");
}
export function generateLetter(input) {
    const authority = getAuthority(input.authorityId);
    // const kind = getKind(input.kindId); // Not used in smart generation, but kept for future use
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
    // Smart letter generation based on tone, urgency, and dates
    const tone = input.tone || "formal";
    const urgency = input.urgency || "normal";
    const useLegal = input.useLegalTone ?? (tone === "formal-legal");
    const opener = getOpenerByTone(tone);
    const closing = getClosingByTone(tone);
    // Build body with smart text selection
    const bodyParts = [opener, ""];
    // Use smart template based on authority and dates
    const firstDate = input.firstContactDateISO || input.eventDateISO || input.dateISO;
    const topic = input.subject || "___";
    if (firstDate) {
        // Use body template based on authority type
        const baseTemplate = getBodyTemplate(input.authorityId, topic, firstDate);
        bodyParts.push(baseTemplate);
        // Add follow-up dates if available
        if (input.secondContactDateISO) {
            bodyParts.push(`פניתי שוב בתאריך ${formatDate(input.secondContactDateISO)}.`);
        }
        bodyParts.push("");
    }
    // Add no response phrase if needed
    if (input.noResponse) {
        bodyParts.push(random(NO_RESPONSE_SENTENCES));
        bodyParts.push("");
    }
    // Add user-provided facts if available
    if (input.facts.trim().length > 0) {
        bodyParts.push(input.facts.trim());
        bodyParts.push("");
    }
    // Add legal soft phrases if needed
    if (useLegal && tone !== "soft") {
        // Use user-selected phrases if available, otherwise random
        if (input.selectedLegalPhrases && input.selectedLegalPhrases.length > 0) {
            // Add all selected phrases
            input.selectedLegalPhrases.forEach((phrase) => {
                bodyParts.push(phrase);
            });
        }
        else {
            // Fallback to random selection
            bodyParts.push(random(LEGAL_SOFT_SENTENCES));
        }
        bodyParts.push("");
    }
    // Add impact phrase if no response
    if (input.noResponse) {
        bodyParts.push(random(IMPACT_SENTENCES));
        bodyParts.push("");
    }
    // Add user-provided request or smart request
    if (input.request.trim().length > 0) {
        bodyParts.push(input.request.trim());
    }
    else {
        // Fallback to smart request phrase
        bodyParts.push(getRequestByUrgency(urgency, tone));
    }
    bodyParts.push("");
    bodyParts.push(line(input.attachments) ? `נספחים/מסמכים מצורפים (אם יש): ${input.attachments}` : undefined);
    bodyParts.push("");
    bodyParts.push(closing);
    bodyParts.push(input.fullName);
    if (line(input.idNumber)) {
        bodyParts.push(`ת"ז: ${input.idNumber}`);
    }
    if (line(input.phone)) {
        bodyParts.push(`טלפון: ${input.phone}`);
    }
    const body = joinLines(bodyParts);
    // Soft warning as requested - not intimidating, reassuring
    const disclaimer = "הערה: פנייה זו אינה מהווה ייעוץ משפטי. מגדלור מספקת כלי עזר לניסוח מכתבים בלבד. מומלץ להיוועץ באנשי מקצוע מתאימים כאשר נדרש.";
    return {
        subject: `פנייה ל-${authority.label}: ${input.subject}`,
        bodyText: `${header}${fromBlock}${body}`,
        disclaimer,
    };
}
