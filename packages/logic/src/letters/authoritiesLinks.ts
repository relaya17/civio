/**
 * Relevant information links for each authority type
 * Helps users understand their rights and relevant laws
 */

import type { LetterAuthorityId } from "@repo/types";

export interface AuthorityLink {
  readonly title: string;
  readonly url: string;
  readonly description?: string;
}

export interface AuthorityInfo {
  readonly authorityId: LetterAuthorityId;
  readonly links: readonly AuthorityLink[];
  readonly tips: readonly string[];
  readonly relevantLaws: readonly string[];
}

const AUTHORITY_INFO: Record<LetterAuthorityId, AuthorityInfo> = {
  municipality: {
    authorityId: "municipality",
    links: [
      {
        title: "חוק הרשויות המקומיות",
        url: "https://www.nevo.co.il/law_html/law01/999_001.htm",
        description: "חוק המגדיר את סמכויות הרשות המקומית וחובותיה",
      },
      {
        title: "חוק חופש המידע",
        url: "https://www.gov.il/he/departments/legalInfo/law_freedom_of_information",
        description: "זכותך לקבל מידע מהרשות המקומית",
      },
      {
        title: "נציבות תלונות הציבור על שופטים",
        url: "https://www.gov.il/he/departments/ombudsman",
        description: "להגשת תלונות על רשויות מקומיות",
      },
    ],
    tips: [
      "לרשות מקומית יש חובה להשיב לפניות תוך 30 יום",
      "אפשר לפנות לראש הרשות או למנכ\"ל",
      "אם אין מענה, אפשר לפנות לנציב תלונות הציבור",
    ],
    relevantLaws: ["חוק הרשויות המקומיות", "חוק חופש המידע", "חוק חובת המכרזים"],
  },
  "national-insurance": {
    authorityId: "national-insurance",
    links: [
      {
        title: "חוק הביטוח הלאומי",
        url: "https://www.btl.gov.il/About/Pages/default.aspx",
        description: "החוק המרכזי המגדיר את זכויותיך בביטוח הלאומי",
      },
      {
        title: "זכויות בביטוח לאומי",
        url: "https://www.btl.gov.il/Insurance/Pages/default.aspx",
        description: "מידע מפורט על כל הזכויות והקצבאות",
      },
      {
        title: "ועדות ערר",
        url: "https://www.btl.gov.il/Appeals/Pages/default.aspx",
        description: "איך לערער על החלטות ביטוח לאומי",
      },
    ],
    tips: [
      "לביטוח לאומי יש חובה להשיב תוך 45 יום",
      "אפשר לערער על החלטה תוך 12 חודשים",
      "מומלץ לשמור עותקים מכל המסמכים",
    ],
    relevantLaws: ["חוק הביטוח הלאומי", "חוק הבטחת הכנסה", "חוק נכות כללית"],
  },
  "health-fund": {
    authorityId: "health-fund",
    links: [
      {
        title: "חוק ביטוח בריאות ממלכתי",
        url: "https://www.health.gov.il/LegislationLibrary/Briut01.pdf",
        description: "החוק המגדיר את זכויותיך בקופת החולים",
      },
      {
        title: "זכויות החולה",
        url: "https://www.health.gov.il/Subjects/PatientRights/Pages/default.aspx",
        description: "מידע על זכויותיך כחולה",
      },
      {
        title: "ועדת ערר על סירוב למימון",
        url: "https://www.health.gov.il/Subjects/PatientRights/Appeals/Pages/default.aspx",
        description: "איך לערער על החלטות קופת החולים",
      },
    ],
    tips: [
      "לקופת חולים יש חובה להשיב תוך 30 יום",
      "אפשר לערער על סירוב למימון טיפול",
      "מומלץ לבקש אישור בכתב על כל החלטה",
    ],
    relevantLaws: ["חוק ביטוח בריאות ממלכתי", "חוק זכויות החולה"],
  },
  "state-comptroller": {
    authorityId: "state-comptroller",
    links: [
      {
        title: "חוק מבקר המדינה",
        url: "https://www.mevaker.gov.il/he/Pages/default.aspx",
        description: "סמכויות מבקר המדינה וחובותיו",
      },
      {
        title: "הגשת תלונות למבקר המדינה",
        url: "https://www.mevaker.gov.il/he/Complaints/Pages/default.aspx",
        description: "איך להגיש תלונה למבקר המדינה",
      },
    ],
    tips: [
      "מבקר המדינה בודק תלונות על רשויות ציבוריות",
      "תלונות צריכות להיות מנומקות ומפורטות",
      "התהליך יכול לקחת זמן",
    ],
    relevantLaws: ["חוק מבקר המדינה"],
  },
  "welfare-bureau": {
    authorityId: "welfare-bureau",
    links: [
      {
        title: "חוק שירותי רווחה",
        url: "https://www.molsa.gov.il/CommunityInfo/Laws/Pages/default.aspx",
        description: "החוק המגדיר את שירותי הרווחה",
      },
      {
        title: "זכויות במוסדות רווחה",
        url: "https://www.molsa.gov.il/CommunityInfo/Rights/Pages/default.aspx",
        description: "מידע על זכויותיך בשירותי רווחה",
      },
    ],
    tips: [
      "למשרד הרווחה יש חובה להשיב תוך 30 יום",
      "אפשר לפנות למנהל המחלקה",
      "מומלץ לשמור תיעוד של כל פנייה",
    ],
    relevantLaws: ["חוק שירותי רווחה", "חוק הבטחת הכנסה"],
  },
  "housing-ministry": {
    authorityId: "housing-ministry",
    links: [
      {
        title: "חוק הדיור הציבורי",
        url: "https://www.gov.il/he/departments/topics/housing",
        description: "זכויותיך בדיור ציבורי",
      },
      {
        title: "תוכניות דיור",
        url: "https://www.gov.il/he/departments/topics/housing_programs",
        description: "תוכניות סיוע בדיור",
      },
    ],
    tips: [
      "למשרד הבינוי יש חובה להשיב תוך 30 יום",
      "אפשר לערער על החלטות ועדות דיור",
      "מומלץ לשמור עותקים מכל המסמכים",
    ],
    relevantLaws: ["חוק הדיור הציבורי", "חוק ועדות דיור"],
  },
  amidar: {
    authorityId: "amidar",
    links: [
      {
        title: "חוק הדיור הציבורי",
        url: "https://www.amidar.co.il/Pages/default.aspx",
        description: "זכויותיך כשוכר דירה מאמידר",
      },
      {
        title: "תקנון אמידר",
        url: "https://www.amidar.co.il/About/Pages/default.aspx",
        description: "התקנון המגדיר את זכויותיך וחובותיך",
      },
    ],
    tips: [
      "לאמידר יש חובה להשיב תוך 30 יום",
      "אפשר לפנות למנהל הסניף או למשרד הראשי",
      "מומלץ לתעד כל פנייה בכתב",
    ],
    relevantLaws: ["חוק הדיור הציבורי", "חוק הגנת הדייר"],
  },
  general: {
    authorityId: "general",
    links: [
      {
        title: "חוק חופש המידע",
        url: "https://www.gov.il/he/departments/legalInfo/law_freedom_of_information",
        description: "זכותך לקבל מידע מרשויות ציבוריות",
      },
      {
        title: "חוק מינהל תקין",
        url: "https://www.gov.il/he/departments/legalInfo",
        description: "עקרונות המינהל התקין שחלים על כל רשות",
      },
      {
        title: "נציבות תלונות הציבור",
        url: "https://www.gov.il/he/departments/ombudsman",
        description: "להגשת תלונות על רשויות ציבוריות",
      },
    ],
    tips: [
      "לרשות ציבורית יש חובה להשיב לפניות תוך זמן סביר (בדרך כלל 30 יום)",
      "אפשר לערער על החלטות רשויות",
      "מומלץ לשמור תיעוד מפורט של כל פנייה",
    ],
    relevantLaws: ["חוק חופש המידע", "חוק מינהל תקין", "חוק הגנת הפרטיות"],
  },
};

/**
 * Get relevant information links for an authority
 */
export function getAuthorityInfo(authorityId: LetterAuthorityId): AuthorityInfo {
  return AUTHORITY_INFO[authorityId] || AUTHORITY_INFO.general;
}

/**
 * Get tips for dealing with an authority
 */
export function getAuthorityTips(authorityId: LetterAuthorityId): readonly string[] {
  return getAuthorityInfo(authorityId).tips;
}

/**
 * Get relevant laws for an authority
 */
export function getAuthorityLaws(authorityId: LetterAuthorityId): readonly string[] {
  return getAuthorityInfo(authorityId).relevantLaws;
}
