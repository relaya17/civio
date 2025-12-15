import { create } from "zustand";
import type { UserPreferences } from "@repo/types";

const STORAGE_KEY = "civio.userPreferences.v1";

function readPreferences(): UserPreferences {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};
    const obj = parsed as Partial<UserPreferences>;
    return {
      fullName: typeof obj.fullName === "string" ? obj.fullName : undefined,
      idNumber: typeof obj.idNumber === "string" ? obj.idNumber : undefined,
      email: typeof obj.email === "string" ? obj.email : undefined,
      phone: typeof obj.phone === "string" ? obj.phone : undefined,
      address: typeof obj.address === "string" ? obj.address : undefined,
      city: typeof obj.city === "string" ? obj.city : undefined,
      preferredTone: obj.preferredTone === "soft" || obj.preferredTone === "formal" || obj.preferredTone === "formal-legal" ? obj.preferredTone : undefined,
      fontSize: obj.fontSize === "small" || obj.fontSize === "medium" || obj.fontSize === "large" || obj.fontSize === "xlarge" ? obj.fontSize : "medium",
      rememberMe: typeof obj.rememberMe === "boolean" ? obj.rememberMe : false,
    };
  } catch {
    return { fontSize: "medium" };
  }
}

interface UserPreferencesState {
  readonly preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  clearPreferences: () => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>((set) => ({
  preferences: readPreferences(),
  updatePreferences: (updates) =>
    set((s) => {
      const next = { ...s.preferences, ...updates };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return { preferences: next };
    }),
  clearPreferences: () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    set({ preferences: { fontSize: "medium" } });
  },
}));
