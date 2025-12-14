import type { LetterAuthorityId, LetterKindId } from "@repo/types";
export interface LetterPreset {
    readonly id: string;
    readonly label: string;
    readonly authorityId: LetterAuthorityId;
    readonly kindId: LetterKindId;
    readonly subject: string;
    readonly facts: string;
    readonly request: string;
}
export declare function getLetterPresets(params: {
    authorityId: LetterAuthorityId;
    kindId: LetterKindId;
}): readonly LetterPreset[];
//# sourceMappingURL=presets.d.ts.map