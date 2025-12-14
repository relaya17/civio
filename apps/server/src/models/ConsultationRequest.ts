import mongoose, { Schema } from "mongoose";

export interface ConsultationRequestDoc {
  _id: string;
  lawyerId: string;
  consentToShare: boolean;
  contactEmail?: string;
  contactPhone?: string;
  summary: string;
}

const ConsultationRequestSchema = new Schema<ConsultationRequestDoc>(
  {
    _id: { type: String, required: true },
    lawyerId: { type: String, required: true, index: true },
    consentToShare: { type: Boolean, required: true },
    contactEmail: { type: String, required: false },
    contactPhone: { type: String, required: false },
    summary: { type: String, required: true },
  },
  { timestamps: true, collection: "consultation_requests" },
);

export const ConsultationRequestModel =
  (mongoose.models.ConsultationRequest as mongoose.Model<ConsultationRequestDoc> | undefined) ??
  mongoose.model<ConsultationRequestDoc>("ConsultationRequest", ConsultationRequestSchema);


