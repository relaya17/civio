const API_BASE = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

export async function apiGetJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return (await res.json()) as T;
}


