import type { LetterAuthorityId, LetterTone } from "@repo/types";
export declare const LEGAL_SOFT_SENTENCES: readonly ["בהסתמך על עקרונות המינהל התקין וזכות האזרח לקבל מענה מרשות ציבורית,", "בהתאם לחובת הרשות לפעול בשקיפות ובסבירות,", "בהסתמך על חובת רשות ציבורית להשיב לפניות אזרחים,", "בהתאם לכללי המינהל התקין,", "בהסתמך על זכות האזרח לקבל מענה תוך זמן סביר,"];
export declare const NO_RESPONSE_SENTENCES: readonly ["למרות פניות חוזרות, טרם התקבל מענה מסודר או מנומק.", "חרף פניותיי, לא נמסרה לי כל התייחסות עניינית.", "למרות פניות אלו, טרם התקבל מענה מסודר.", "חרף פניות קודמות, לא נמסרה לי תשובה עניינית."];
export declare const IMPACT_SENTENCES: readonly ["היעדר המענה גורם לי קושי ממשי בהתנהלות ופוגע ביכולתי למצות את זכויותיי.", "מצב זה מקשה עליי ומעמיד אותי בחוסר ודאות מתמשך.", "הדבר גורם לי קושי ממשי בהתנהלות היומיומית.", "היעדר מענה פוגע ביכולתי למצות את זכויותיי."];
export declare function getBodyTemplate(authorityId: LetterAuthorityId, topic: string, firstDate: string): string;
export declare function random<T>(arr: readonly T[]): T;
export declare function formatDate(dateISO: string | undefined): string;
export declare function getOpenerByTone(tone?: LetterTone): string;
export declare function getClosingByTone(tone?: LetterTone): string;
export declare function getRequestByUrgency(urgency: "normal" | "high" | undefined, tone?: LetterTone): string;
//# sourceMappingURL=smartTemplates.d.ts.map