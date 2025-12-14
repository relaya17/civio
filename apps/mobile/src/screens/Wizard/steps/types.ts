export type SituationId = "unemployment" | "disability" | "debt" | "financial-support" | "unsure";

export type EmploymentStatusId = "not-working" | "part-time" | "working" | "unsure";

export type AgeRangeId = "under-18" | "18-25" | "26-60" | "over-60" | "unsure";

export interface WizardContext {
  readonly situation: SituationId;
  readonly employmentStatus: EmploymentStatusId;
  readonly ageRange: AgeRangeId;
}


