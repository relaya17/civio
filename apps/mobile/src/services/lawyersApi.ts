import type { LawyerPublicProfile } from "@repo/types";
import type { RequestConsultationInput, RequestConsultationResult } from "@repo/types";
import { apiGetJson } from "./api";

export async function listLawyers() {
  return await apiGetJson<{ items: LawyerPublicProfile[]; total: number }>(`/api/lawyers`);
}

export async function getLawyer(id: string) {
  return await apiGetJson<{ lawyer: LawyerPublicProfile }>(`/api/lawyers/${encodeURIComponent(id)}`);
}

export async function requestConsultation(lawyerId: string, input: RequestConsultationInput) {
  const res = await fetch(
    `${process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000"}/api/lawyers/${encodeURIComponent(
      lawyerId,
    )}/request-consultation`,
    {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify(input),
    },
  );
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return (await res.json()) as RequestConsultationResult;
}


