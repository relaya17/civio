import type { LetterAuthorityId, LetterKindId } from "@repo/types";
export type LetterSuggestionTarget = "facts" | "request";
export interface LetterSuggestion {
    readonly id: string;
    readonly label: string;
    readonly text: string;
    readonly target: LetterSuggestionTarget;
}
export declare const LEGAL_SOFT_PHRASES: readonly ["בהסתמך על חובת הרשות לפעול בשקיפות ובהגינות", "בהסתמך על זכות האזרח לקבל מענה תוך זמן סביר", "בהתאם לכללי המינהל התקין", "בהתאם לעקרונות השוויון והסבירות"];
export declare function getLetterSuggestions(params: {
    authorityId: LetterAuthorityId;
    kindId: LetterKindId;
}): readonly LetterSuggestion[];
//# sourceMappingURL=suggestions.d.ts.map