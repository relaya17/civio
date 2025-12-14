import mongoose, { Schema } from "mongoose";
import type { LawyerSpecialty, VerificationStatus } from "@repo/types";

export interface LawyerDoc {
  _id: string;
  displayName: string;
  email: string;
  licenseNumber: string;
  specialties: LawyerSpecialty[];
  consultationFeeNIS: number | null;
  offersFreeMonthlySlot: boolean;
  verificationStatus: VerificationStatus;
  availability: { startISO: string; minutes: number; isFree: boolean }[];
  bio?: string;
}

const LawyerSchema = new Schema<LawyerDoc>(
  {
    _id: { type: String, required: true },
    displayName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    licenseNumber: { type: String, required: true },
    specialties: { type: [String], required: true },
    consultationFeeNIS: { type: Number, default: null },
    offersFreeMonthlySlot: { type: Boolean, default: false },
    verificationStatus: { type: String, default: "pending" },
    availability: {
      type: [
        {
          startISO: { type: String, required: true },
          minutes: { type: Number, required: true },
          isFree: { type: Boolean, required: true },
        },
      ],
      default: [],
    },
    bio: { type: String, required: false },
  },
  { timestamps: true, collection: "lawyers" },
);

export const LawyerModel =
  (mongoose.models.Lawyer as mongoose.Model<LawyerDoc> | undefined) ??
  mongoose.model<LawyerDoc>("Lawyer", LawyerSchema);


