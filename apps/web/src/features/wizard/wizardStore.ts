import { create } from "zustand";
import type { WizardAnswerMap, WizardDefinition, WizardStepId, WizardOptionValue } from "@repo/types";

const STORAGE_KEY_PREFIX = "civio.wizard.v1.";

function storageKey(wizardId: string) {
  return `${STORAGE_KEY_PREFIX}${wizardId}`;
}

function readPersisted(wizardId: string): { answers: WizardAnswerMap; stepIndex: number } {
  try {
    const raw = window.localStorage.getItem(storageKey(wizardId));
    if (!raw) return { answers: {}, stepIndex: 0 };
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return { answers: {}, stepIndex: 0 };
    const obj = parsed as { answers?: unknown; stepIndex?: unknown };
    const answers = (obj.answers && typeof obj.answers === "object" ? obj.answers : {}) as WizardAnswerMap;
    const stepIndex = typeof obj.stepIndex === "number" ? obj.stepIndex : 0;
    return { answers, stepIndex };
  } catch {
    return { answers: {}, stepIndex: 0 };
  }
}

function persist(wizardId: string, data: { answers: WizardAnswerMap; stepIndex: number }) {
  window.localStorage.setItem(storageKey(wizardId), JSON.stringify(data));
}

interface WizardState {
  readonly wizard: WizardDefinition | null;
  readonly stepIndex: number;
  readonly answers: WizardAnswerMap;
  loadWizard: (wizard: WizardDefinition) => void;
  answer: (stepId: WizardStepId, value: WizardOptionValue) => void;
  next: () => void;
  back: () => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>((set, get) => ({
  wizard: null,
  stepIndex: 0,
  answers: {},
  loadWizard: (wizard) =>
    set(() => {
      const persisted = readPersisted(wizard.id);
      return { wizard, stepIndex: persisted.stepIndex, answers: persisted.answers };
    }),
  answer: (stepId, value) =>
    set((s) => {
      if (!s.wizard) return s;
      const nextAnswers = { ...s.answers, [stepId]: value };
      const nextState = { ...s, answers: nextAnswers };
      persist(s.wizard.id, { answers: nextAnswers, stepIndex: s.stepIndex });
      return nextState;
    }),
  next: () =>
    set((s) => {
      if (!s.wizard) return s;
      const max = s.wizard.steps.length; // + summary later
      const nextIndex = Math.min(s.stepIndex + 1, max);
      persist(s.wizard.id, { answers: s.answers, stepIndex: nextIndex });
      return { ...s, stepIndex: nextIndex };
    }),
  back: () =>
    set((s) => {
      if (!s.wizard) return s;
      const nextIndex = Math.max(s.stepIndex - 1, 0);
      persist(s.wizard.id, { answers: s.answers, stepIndex: nextIndex });
      return { ...s, stepIndex: nextIndex };
    }),
  reset: () => {
    const w = get().wizard;
    if (w) window.localStorage.removeItem(storageKey(w.id));
    set({ stepIndex: 0, answers: {}, wizard: w ?? null });
  },
}));


