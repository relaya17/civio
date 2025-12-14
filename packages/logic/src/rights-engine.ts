import type { WizardAnswerMap } from "@repo/types";

export interface PossiblePath {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
}

/**
 * MVP: deterministic suggestions based on answers.
 * Later: rules + AI (behind an AI Gateway) with caching.
 */
export function getPossiblePaths(_answers: WizardAnswerMap): readonly PossiblePath[] {
  return [
    {
      id: "collect-docs",
      title: "איסוף מסמכים בסיסיים",
      summary: "כדאי לרכז חוזה/תלושים/מכתב פיטורים כדי לאפשר בדיקה מסודרת וניסוח פנייה רשמית.",
    },
  ];
}


