import type { LetterAuthorityId, LetterKindId } from "@repo/types";
export type LetterSuggestionTarget = "facts" | "request";
export interface LetterSuggestion {
    readonly id: string;
    readonly label: string;
    readonly text: string;
    readonly target: LetterSuggestionTarget;
}
export declare function getLetterSuggestions(params: {
    authorityId: LetterAuthorityId;
    kindId: LetterKindId;
}): readonly LetterSuggestion[];
//# sourceMappingURL=suggestions.d.ts.map