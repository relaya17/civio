import type { WizardAnswerMap } from "@repo/types/wizard";
export interface PossiblePath {
    readonly id: string;
    readonly title: string;
    readonly summary: string;
}
/**
 * MVP: deterministic suggestions based on answers.
 * Later: rules + AI (behind an AI Gateway) with caching.
 */
export declare function getPossiblePaths(_answers: WizardAnswerMap): readonly PossiblePath[];
//# sourceMappingURL=rights-engine.d.ts.map