import type { LawyerPublicProfile, RegisterLawyerInput, RequestConsultationInput, RequestConsultationResult } from "@repo/types";
import { apiGetJson, apiPostJson } from "./api";

export async function listLawyers(params?: { specialty?: string; freeOnly?: boolean }) {
  const search = new URLSearchParams();
  if (params?.specialty) search.set("specialty", params.specialty);
  if (typeof params?.freeOnly === "boolean") search.set("freeOnly", String(params.freeOnly));
  const qs = search.toString();
  return await apiGetJson<{ items: LawyerPublicProfile[]; total: number }>(
    `/api/lawyers${qs ? `?${qs}` : ""}`,
  );
}

export async function getLawyer(id: string) {
  return await apiGetJson<{ lawyer: LawyerPublicProfile }>(`/api/lawyers/${encodeURIComponent(id)}`);
}

export async function registerLawyer(input: RegisterLawyerInput) {
  return await apiPostJson<{ lawyer: LawyerPublicProfile; notice: string }>(`/api/lawyers/register`, input);
}

export async function requestConsultation(lawyerId: string, input: RequestConsultationInput) {
  return await apiPostJson<RequestConsultationResult>(
    `/api/lawyers/${encodeURIComponent(lawyerId)}/request-consultation`,
    input,
  );
}


