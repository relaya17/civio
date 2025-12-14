import { create } from "zustand";
import type { FeatureFlags } from "@repo/types";

const DEFAULT_FLAGS: FeatureFlags = {
  "wizard.employeeTermination": true,
  "lawyers.enabled": true,
  "letters.enabled": true,
  "shabbatGate.enabled": true,
  "tts.enabled": true,
};

const STORAGE_KEY = "civio.featureFlags.v1";

function readFlags(): FeatureFlags {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_FLAGS;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return DEFAULT_FLAGS;
    const obj = parsed as Partial<Record<keyof FeatureFlags, unknown>>;

    return {
      "wizard.employeeTermination":
        typeof obj["wizard.employeeTermination"] === "boolean"
          ? obj["wizard.employeeTermination"]
          : DEFAULT_FLAGS["wizard.employeeTermination"],
      "lawyers.enabled":
        typeof obj["lawyers.enabled"] === "boolean"
          ? obj["lawyers.enabled"]
          : DEFAULT_FLAGS["lawyers.enabled"],
      "letters.enabled":
        typeof obj["letters.enabled"] === "boolean"
          ? obj["letters.enabled"]
          : DEFAULT_FLAGS["letters.enabled"],
      "shabbatGate.enabled":
        typeof obj["shabbatGate.enabled"] === "boolean"
          ? obj["shabbatGate.enabled"]
          : DEFAULT_FLAGS["shabbatGate.enabled"],
      "tts.enabled":
        typeof obj["tts.enabled"] === "boolean" ? obj["tts.enabled"] : DEFAULT_FLAGS["tts.enabled"],
    };
  } catch {
    return DEFAULT_FLAGS;
  }
}

interface FeatureFlagsState {
  readonly flags: FeatureFlags;
  setFlag: (key: keyof FeatureFlags, value: boolean) => void;
}

export const useFeatureFlagsStore = create<FeatureFlagsState>((set) => ({
  flags: readFlags(),
  setFlag: (key, value) =>
    set((s) => {
      const next = { ...s.flags, [key]: value };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { flags: next };
    }),
}));


