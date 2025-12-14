export type LawyerId = string;

export type LawyerSpecialty =
  | "labor"
  | "national-insurance"
  | "health"
  | "housing"
  | "family"
  | "immigration"
  | "other";

export type VerificationStatus = "pending" | "verified" | "rejected";

export interface AvailabilitySlot {
  /** ISO string in Israel time (server-normalized) */
  readonly startISO: string;
  readonly minutes: number;
  readonly isFree: boolean;
}

export interface LawyerPublicProfile {
  readonly id: LawyerId;
  readonly displayName: string;
  readonly specialties: readonly LawyerSpecialty[];
  readonly consultationFeeNIS: number | null; // null = "contact for pricing"
  readonly offersFreeMonthlySlot: boolean;
  readonly verificationStatus: VerificationStatus;
  readonly availability: readonly AvailabilitySlot[];
  readonly bio?: string;
}

export interface RegisterLawyerInput {
  readonly displayName: string;
  readonly email: string;
  readonly licenseNumber: string;
  readonly specialties: readonly LawyerSpecialty[];
  readonly consultationFeeNIS?: number | null;
  readonly offersFreeMonthlySlot?: boolean;
  readonly bio?: string;
}


