import type { LawyerId } from "./lawyers.js";

export type ConsultationRequestId = string;

export interface RequestConsultationInput {
  readonly consentToShare: true;
  readonly contactEmail?: string;
  readonly contactPhone?: string;
  readonly summary: string; // short, plain-language
}

export interface RequestConsultationResult {
  readonly requestId: ConsultationRequestId;
  readonly lawyerId: LawyerId;
  readonly message: string;
}


