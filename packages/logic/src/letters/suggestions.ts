import type { LetterAuthorityId, LetterKindId } from "@repo/types";

export type LetterSuggestionTarget = "facts" | "request";

export interface LetterSuggestion {
  readonly id: string;
  readonly label: string;
  readonly text: string;
  readonly target: LetterSuggestionTarget;
}

const COMMON_FACTS: readonly LetterSuggestion[] = [
  {
    id: "facts.short",
    label: "תיאור קצר",
    target: "facts",
    text: "אני מתאר/ת בקצרה את השתלשלות האירועים ומצרף/ת פרטים רלוונטיים.",
  },
  {
    id: "facts.dates",
    label: "תאריכים",
    target: "facts",
    text: "התהליך/האירוע התרחש בתאריך ___, ובתאריך ___ פניתי/קיבלתי/החלטה.",
  },
  {
    id: "facts.no-response",
    label: "אין מענה",
    target: "facts",
    text: "פניתי מספר פעמים אך טרם קיבלתי מענה מסודר/מנומק.",
  },
  {
    id: "facts.no-response-soft",
    label: "אין מענה (עדין)",
    target: "facts",
    text: "למרות פניות חוזרות, טרם התקבל מענה מסודר.",
  },
  {
    id: "facts.no-response-formal",
    label: "אין מענה (רשמי)",
    target: "facts",
    text: "חרף פניות קודמות, לא נמסרה לי תשובה עניינית.",
  },
] as const;

const COMMON_REQUESTS: readonly LetterSuggestion[] = [
  {
    id: "req.written-response",
    label: "מענה בכתב",
    target: "request",
    text: "אבקש לקבל תשובה בכתב ומנומקת.",
  },
  {
    id: "req.next-steps",
    label: "הנחיות ברורות",
    target: "request",
    text: "אבקש הנחיות ברורות מה נדרש ממני כדי לקדם את הטיפול.",
  },
  {
    id: "req.urgency",
    label: "דחיפות",
    target: "request",
    text: "אבקש טיפול בהקדם האפשרי עקב דחיפות הנושא.",
  },
  {
    id: "req.soft",
    label: "בקשה עדינה",
    target: "request",
    text: "אבקש לקבל מענה בכתב בהקדם האפשרי.",
  },
  {
    id: "req.formal",
    label: "בקשה רשמית",
    target: "request",
    text: "אבקש התייחסות עניינית ומנומקת לפנייתי.",
  },
  {
    id: "req.legal-soft",
    label: "חיזוק משפטי רך",
    target: "request",
    text: "בהסתמך על חובת הרשות לפעול בשקיפות ובהגינות, אבקש לקבל מענה תוך זמן סביר.",
  },
] as const;

const DOCUMENTS_REQUEST: readonly LetterSuggestion[] = [
  {
    id: "req.documents.list",
    label: "רשימת מסמכים",
    target: "request",
    text: "אבקש לקבל העתק של כל המסמכים/הרישומים הרלוונטיים לתיק שלי, לרבות החלטות, סיכומים והתכתבויות.",
  },
  {
    id: "req.documents.how",
    label: "איך מקבלים",
    target: "request",
    text: "אם יש טופס/הליך לקבלת המסמכים, אבקש להפנות אותי אליו ולהסביר מה בדיוק צריך למלא.",
  },
] as const;

const APPEAL_REQUEST: readonly LetterSuggestion[] = [
  {
    id: "req.appeal.general",
    label: "השגה כללית",
    target: "request",
    text: "אבקש לבחון מחדש את ההחלטה ולשקול שינוי/תיקון בהתאם לנסיבות.",
  },
  {
    id: "req.appeal.reasons",
    label: "נימוקים/מסמכים",
    target: "request",
    text: "אבקש לציין את הנימוקים להחלטה והאם חסר מסמך/מידע לצורך בחינה חוזרת.",
  },
] as const;

// Legal soft phrases for checkbox selection
export const LEGAL_SOFT_PHRASES = [
  "בהסתמך על חובת הרשות לפעול בשקיפות ובהגינות",
  "בהסתמך על זכות האזרח לקבל מענה תוך זמן סביר",
  "בהתאם לכללי המינהל התקין",
  "בהתאם לעקרונות השוויון והסבירות",
] as const;

export function getLetterSuggestions(params: {
  authorityId: LetterAuthorityId;
  kindId: LetterKindId;
}): readonly LetterSuggestion[] {
  const base = [...COMMON_FACTS, ...COMMON_REQUESTS];

  if (params.kindId === "request-documents") return [...base, ...DOCUMENTS_REQUEST];
  if (params.kindId === "appeal-objection") return [...base, ...APPEAL_REQUEST];

  // Very light authority-specific nudge (still generic).
  if (params.authorityId === "state-comptroller") {
    return [
      ...base,
      {
        id: "req.comptroller.review",
        label: "בדיקה/בירור",
        target: "request",
        text: "אבקש בדיקה/בירור של אופן הטיפול בענייני והכוונה כיצד ניתן לקבל מענה מסודר מהרשות.",
      },
    ];
  }

  // Add authority-specific suggestions
  if (params.authorityId === "municipality") {
    return [
      ...base,
      {
        id: "req.municipality.transparency",
        label: "שקיפות וסבירות",
        target: "request",
        text: "בהסתמך על חובת רשות מקומית לפעול בשקיפות, סבירות ומתן מענה לאזרחים, אבקש את התייחסותכם.",
      },
    ];
  }

  if (params.authorityId === "national-insurance") {
    return [
      ...base,
      {
        id: "req.btl.reasonable-time",
        label: "זמן סביר",
        target: "request",
        text: "בהסתמך על זכות המבוטח לקבל החלטה בתוך זמן סביר ובהתאם לכללי המינהל התקין, אבקש מענה.",
      },
    ];
  }

  if (params.authorityId === "health-fund") {
    return [
      ...base,
      {
        id: "req.hmo.patient-rights",
        label: "זכויות מטופל",
        target: "request",
        text: "בהסתמך על זכות המטופל לקבל מידע ומענה בזמן סביר, אבקש את התייחסותכם.",
      },
    ];
  }

  return base;
}


