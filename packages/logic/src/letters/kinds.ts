import type { LetterKind } from "@repo/types";

export const LETTER_KINDS: readonly LetterKind[] = [
  { id: "complaint", label: "תלונה / פנייה" },
  { id: "request-info", label: "בקשת מידע / בירור" },
  { id: "request-meeting", label: "בקשה לקביעת פגישה / טיפול" },
  { id: "appeal-objection", label: "השגה / ערעור (כללי)" },
  { id: "request-documents", label: "בקשה למסמכים / עיון בתיק" },
] as const;

export function getKind(id: LetterKind["id"]) {
  const k = LETTER_KINDS.find((x) => x.id === id);
  if (!k) throw new Error(`Unknown kind: ${id}`);
  return k;
}


