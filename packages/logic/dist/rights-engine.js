/**
 * MVP: deterministic suggestions based on answers.
 * Later: rules + AI (behind an AI Gateway) with caching.
 */
export function getPossiblePaths(_answers) {
    return [
        {
            id: "collect-docs",
            title: "איסוף מסמכים בסיסיים",
            summary: "כדאי לרכז חוזה/תלושים/מכתב פיטורים כדי לאפשר בדיקה מסודרת וניסוח פנייה רשמית.",
        },
    ];
}
