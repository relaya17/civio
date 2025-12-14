export type FeatureFlagKey =
  | "wizard.employeeTermination"
  | "lawyers.enabled"
  | "letters.enabled"
  | "shabbatGate.enabled"
  | "tts.enabled";

export type FeatureFlags = Record<FeatureFlagKey, boolean>;


