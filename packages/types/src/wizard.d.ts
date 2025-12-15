export type WizardId = string;
export type WizardStepId = string;
export type WizardOptionValue = string;
export interface WizardOption {
    readonly value: WizardOptionValue;
    readonly label: string;
    readonly ariaLabel?: string;
}
export interface WizardStep {
    readonly id: WizardStepId;
    readonly title: string;
    readonly question: string;
    readonly whyAsking: string;
    readonly options: readonly WizardOption[];
}
export interface WizardSource {
    readonly title: string;
    readonly url: string;
    readonly lastReviewedISODate: string;
}
export type WizardAnswerMap = Record<WizardStepId, WizardOptionValue>;
export interface WizardDefinition {
    readonly id: WizardId;
    readonly title: string;
    readonly description: string;
    readonly steps: readonly WizardStep[];
    readonly sources: readonly WizardSource[];
    readonly disclaimer: {
        readonly short: string;
        readonly full: string;
    };
}
//# sourceMappingURL=wizard.d.ts.map