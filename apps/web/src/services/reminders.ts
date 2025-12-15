/**
 * Smart Reminders Service
 * 
 * Checks for letters that haven't received responses and suggests follow-ups
 */

import type { SavedLetter } from "../state/savedLettersStore";

export interface Reminder {
  readonly letterId: string;
  readonly letterSubject: string;
  readonly daysSinceSent: number;
  readonly suggestedAction: "reminder" | "escalation" | "appeal";
  readonly message: string;
}

const DAYS_FOR_REMINDER = 14;
const DAYS_FOR_ESCALATION = 30;
const DAYS_FOR_APPEAL = 45;

/**
 * Check for letters that need reminders
 */
export function checkReminders(letters: SavedLetter[]): Reminder[] {
  const now = Date.now();
  const reminders: Reminder[] = [];

  for (const letter of letters) {
    // Only check letters that were sent and are waiting for response
    if (letter.status !== "sent" && letter.status !== "waiting-response") {
      continue;
    }

    // Skip if already received feedback
    if (letter.feedback === "response-received") {
      continue;
    }

    const sentAt = letter.sentAt || letter.savedAt;
    const daysSinceSent = Math.floor((now - sentAt) / (1000 * 60 * 60 * 24));

    if (daysSinceSent >= DAYS_FOR_APPEAL) {
      reminders.push({
        letterId: letter.id,
        letterSubject: letter.subject,
        daysSinceSent,
        suggestedAction: "appeal",
        message: `עברו ${daysSinceSent} ימים מאז שליחת המכתב. מומלץ לשלוח מכתב ערעור או לפנות לגורם מפקח.`,
      });
    } else if (daysSinceSent >= DAYS_FOR_ESCALATION) {
      reminders.push({
        letterId: letter.id,
        letterSubject: letter.subject,
        daysSinceSent,
        suggestedAction: "escalation",
        message: `עברו ${daysSinceSent} ימים ללא מענה. מומלץ לשלוח תזכורת תקיפה יותר או לפנות לגורם בכיר יותר.`,
      });
    } else if (daysSinceSent >= DAYS_FOR_REMINDER) {
      reminders.push({
        letterId: letter.id,
        letterSubject: letter.subject,
        daysSinceSent,
        suggestedAction: "reminder",
        message: `עברו ${daysSinceSent} ימים מאז שליחת המכתב. מומלץ לשלוח תזכורת עדינה.`,
      });
    }
  }

  return reminders.sort((a, b) => b.daysSinceSent - a.daysSinceSent);
}

/**
 * Get reminder notification message
 * 
 * Future: Use for browser notifications or email alerts
 */
export function getReminderNotification(reminder: Reminder): string {
  return `📬 ${reminder.letterSubject}\n${reminder.message}`;
}
