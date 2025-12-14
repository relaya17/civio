import type { LetterAuthority } from "@repo/types";

export const LETTER_AUTHORITIES: readonly LetterAuthority[] = [
  {
    id: "general",
    label: "כללי (לכל מאן דבעי)",
    toLine: "לכל מאן דבעי",
  },
  {
    id: "state-comptroller",
    label: "מבקר המדינה",
    toLine: "לכבוד נציבות תלונות הציבור / מבקר המדינה",
    addressLine: "ירושלים",
  },
  {
    id: "welfare-bureau",
    label: "לשכת רווחה (עירייה/מועצה)",
    toLine: "לכבוד לשכת הרווחה",
  },
  {
    id: "housing-ministry",
    label: "משרד הבינוי והשיכון",
    toLine: "לכבוד משרד הבינוי והשיכון",
    addressLine: "ירושלים",
  },
  {
    id: "amidar",
    label: "עמידר (חברה משכנת)",
    toLine: "לכבוד עמידר (פניות דיירים / שירות לקוחות)",
  },
  {
    id: "national-insurance",
    label: "ביטוח לאומי",
    toLine: "לכבוד המוסד לביטוח לאומי",
  },
  {
    id: "health-fund",
    label: "קופת חולים",
    toLine: "לכבוד קופת החולים (שירות לקוחות / פניות הציבור)",
  },
  {
    id: "municipality",
    label: "עירייה / מועצה מקומית",
    toLine: "לכבוד עירייה / מועצה מקומית (פניות הציבור)",
  },
] as const;

export function getAuthority(id: LetterAuthority["id"]) {
  const a = LETTER_AUTHORITIES.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown authority: ${id}`);
  return a;
}


