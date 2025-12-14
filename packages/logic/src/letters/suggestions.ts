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

  return base;
}


