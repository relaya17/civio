import { Router } from "express";
import type { Router as ExpressRouter } from "express";
import {
  getLawyerById,
  listLawyers,
  registerLawyer,
  requestConsultation,
} from "../controllers/lawyerController.js";

export function lawyersRouter(): ExpressRouter {
  const r = Router();

  // Civio is a connector platform: no legal advice here.
  r.get("/", listLawyers);
  r.get("/:id", getLawyerById);
  r.post("/register", registerLawyer);
  r.post("/:id/request-consultation", requestConsultation);

  return r;
}


