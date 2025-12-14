import type { RequestHandler } from "express";
import crypto from "node:crypto";
import { z } from "zod";
import type {
  LawyerPublicProfile,
  RegisterLawyerInput,
  RequestConsultationInput,
  RequestConsultationResult,
} from "@repo/types";
import { isMongoConnected } from "../lib/mongo.js";
import { LawyerModel } from "../models/Lawyer.js";
import { ConsultationRequestModel } from "../models/ConsultationRequest.js";

type LawyerRecord = LawyerPublicProfile & {
  readonly email: string;
  readonly licenseNumber: string;
};

const specialtySchema = z.enum([
  "labor",
  "national-insurance",
  "health",
  "housing",
  "family",
  "immigration",
  "other",
] as const);

const registerSchema = z.object({
  displayName: z.string().min(2).max(80),
  email: z.string().email(),
  licenseNumber: z.string().min(3).max(32),
  specialties: z.array(specialtySchema).min(1).max(6),
  consultationFeeNIS: z.number().int().min(0).max(10_000).nullable().optional(),
  offersFreeMonthlySlot: z.boolean().optional(),
  bio: z.string().max(600).optional(),
});

const listQuerySchema = z.object({
  specialty: specialtySchema.optional(),
  freeOnly: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true"),
});

// MVP: in-memory store. Replace with Mongo (and do not store raw license numbers without need).
const lawyers = new Map<string, LawyerRecord>();

function toPublic(l: LawyerRecord): LawyerPublicProfile {
  // Never expose email/license in public profile.
  const { email: _email, licenseNumber: _license, ...publicProfile } = l;
  void _email;
  void _license;
  return publicProfile;
}

export const registerLawyer: RequestHandler = async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body) satisfies RegisterLawyerInput;
    const id = crypto.randomUUID();

    const record: LawyerRecord = {
      id,
      displayName: body.displayName,
      specialties: body.specialties,
      consultationFeeNIS: body.consultationFeeNIS ?? null,
      offersFreeMonthlySlot: body.offersFreeMonthlySlot ?? false,
      verificationStatus: "pending",
      availability: [],
      bio: body.bio,
      email: body.email,
      licenseNumber: body.licenseNumber,
    };

    if (isMongoConnected()) {
      const doc = {
        _id: id,
        displayName: record.displayName,
        email: record.email,
        licenseNumber: record.licenseNumber,
        specialties: [...record.specialties],
        consultationFeeNIS: record.consultationFeeNIS,
        offersFreeMonthlySlot: record.offersFreeMonthlySlot,
        verificationStatus: record.verificationStatus,
        availability: record.availability.map((a: { startISO: string; minutes: number; isFree: boolean }) => ({
          startISO: a.startISO,
          minutes: a.minutes,
          isFree: a.isFree,
        })),
        bio: record.bio,
      };
      await new LawyerModel(doc).save();
    } else {
      lawyers.set(id, record);
    }

    return res.status(201).json({
      lawyer: toPublic(record),
      notice:
        "ההרשמה התקבלה. Civio אינה מספקת ייעוץ משפטי אלא מחברת בין משתמשים לאנשי מקצוע. אימות מקצועי יבוצע לפני חשיפה מלאה.",
    });
  } catch (err) {
    return next(err);
  }
};

export const listLawyers: RequestHandler = (req, res, next) => {
  try {
    const q = listQuerySchema.parse(req.query);
    if (isMongoConnected()) {
      void LawyerModel.find({})
        .lean()
        .then((rows) => {
          const items = rows
            .map((r) => {
              const record: LawyerRecord = {
                id: r._id,
                displayName: r.displayName,
                specialties: r.specialties,
                consultationFeeNIS: r.consultationFeeNIS,
                offersFreeMonthlySlot: r.offersFreeMonthlySlot,
                verificationStatus: r.verificationStatus,
                availability: r.availability,
                bio: r.bio,
                email: r.email,
                licenseNumber: r.licenseNumber,
              };
              return toPublic(record);
            })
            .filter((l) => (q.specialty ? l.specialties.includes(q.specialty) : true))
            .filter((l) => (q.freeOnly ? l.offersFreeMonthlySlot : true));
          res.json({ items, total: items.length });
        })
        .catch((err: unknown) => next(err));
      return;
    }

    const items = [...lawyers.values()]
      .filter((l) => (q.specialty ? l.specialties.includes(q.specialty) : true))
      .filter((l) => (q.freeOnly ? l.offersFreeMonthlySlot : true))
      .map(toPublic);

    return res.json({ items, total: items.length });
  } catch (err) {
    return next(err);
  }
};

export const getLawyerById: RequestHandler = (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(404).json({ error: "not_found" });

  if (isMongoConnected()) {
    void LawyerModel.findById(id)
      .lean()
      .then((r) => {
        if (!r) return res.status(404).json({ error: "not_found" });
        const record: LawyerRecord = {
          id: r._id,
          displayName: r.displayName,
          specialties: r.specialties,
          consultationFeeNIS: r.consultationFeeNIS,
          offersFreeMonthlySlot: r.offersFreeMonthlySlot,
          verificationStatus: r.verificationStatus,
          availability: r.availability,
          bio: r.bio,
          email: r.email,
          licenseNumber: r.licenseNumber,
        };
        return res.json({ lawyer: toPublic(record) });
      })
      .catch(() => res.status(500).json({ error: "internal_error" }));
    return;
  }

  const record = lawyers.get(id);
  if (!record) return res.status(404).json({ error: "not_found" });
  return res.json({ lawyer: toPublic(record) });
};

const requestConsultationSchema = z.object({
  consentToShare: z.literal(true),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().min(6).max(32).optional(),
  summary: z.string().min(10).max(800),
});

export const requestConsultation: RequestHandler = async (req, res, next) => {
  try {
    const lawyerId = req.params.id;
    if (!lawyerId) return res.status(404).json({ error: "not_found" });
    const body = requestConsultationSchema.parse(req.body) satisfies RequestConsultationInput;

    // Ensure lawyer exists
    if (isMongoConnected()) {
      const exists = await LawyerModel.exists({ _id: lawyerId });
      if (!exists) return res.status(404).json({ error: "not_found" });
    } else {
      if (!lawyers.has(lawyerId)) return res.status(404).json({ error: "not_found" });
    }

    const requestId = crypto.randomUUID();
    if (isMongoConnected()) {
      const doc = {
        _id: requestId,
        lawyerId,
        consentToShare: true,
        contactEmail: body.contactEmail,
        contactPhone: body.contactPhone,
        summary: body.summary,
      };
      await new ConsultationRequestModel(doc).save();
    }

    const result: RequestConsultationResult = {
      requestId,
      lawyerId,
      message:
        "הבקשה נקלטה. Civio אינה ייעוץ משפטי — ההמשך הוא מול איש/אשת המקצוע ובהסכמת שני הצדדים.",
    };
    return res.status(201).json(result);
  } catch (err) {
    return next(err);
  }
};


