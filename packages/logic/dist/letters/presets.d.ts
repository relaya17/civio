import type { LetterAuthorityId, LetterKindId, LetterSituation } from "@repo/types";
export interface LetterPreset {
    readonly id: string;
    readonly label: string;
    readonly authorityId: LetterAuthorityId;
    readonly kindId: LetterKindId;
    readonly subject: string;
    readonly facts: string;
    readonly request: string;
    readonly situation?: LetterSituation;
}
export declare function getLetterPresets(params: {
    authorityId: LetterAuthorityId;
    kindId: LetterKindId;
    situation?: LetterSituation;
}): readonly LetterPreset[];
//# sourceMappingURL=presets.d.ts.map