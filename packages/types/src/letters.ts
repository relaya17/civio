export type LetterAuthorityId =
  | "general"
  | "state-comptroller"
  | "welfare-bureau"
  | "housing-ministry"
  | "amidar"
  | "national-insurance"
  | "health-fund"
  | "municipality";

export type LetterKindId =
  | "complaint"
  | "request-info"
  | "request-meeting"
  | "appeal-objection"
  | "request-documents";

// Letter situation/state for smart templates
export type LetterSituation =
  | "first-contact" // פנייה ראשונית
  | "no-response" // אין מענה
  | "appeal" // ערעור על החלטה
  | "warning"; // התראה לפני נקיטת צעדים

export interface LetterAuthority {
  readonly id: LetterAuthorityId;
  readonly label: string;
  readonly toLine: string;
  readonly addressLine?: string;
}

export interface LetterKind {
  readonly id: LetterKindId;
  readonly label: string;
}

export type LetterTone = "soft" | "formal" | "formal-legal";
export type LetterUrgency = "normal" | "high";

// Letter status for tracking
export type LetterStatus = "draft" | "sent" | "waiting-response" | "response-received" | "closed";

export interface LetterComposerInput {
  readonly authorityId: LetterAuthorityId;
  readonly kindId: LetterKindId;
  readonly fullName: string;
  readonly idNumber?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly caseNumber?: string;
  readonly subject: string;
  readonly facts: string;
  readonly request: string;
  readonly attachments?: string;
  readonly city?: string;
  readonly dateISO: string; // yyyy-mm-dd
  // New fields for smart letter generation
  readonly tone?: LetterTone; // "soft" | "formal" | "formal-legal"
  readonly urgency?: LetterUrgency; // "normal" | "high"
  readonly eventDateISO?: string; // Date when the event happened
  readonly firstContactDateISO?: string; // Date of first contact
  readonly secondContactDateISO?: string; // Date of second contact (optional)
  readonly noResponse?: boolean; // Whether no response was received
  readonly useLegalTone?: boolean; // Whether to use soft legal phrases
  readonly situation?: LetterSituation; // Situation for smart template selection
}

export interface GeneratedLetter {
  readonly subject: string;
  readonly bodyText: string; // full letter as plain text
  readonly disclaimer: string;
  readonly status?: LetterStatus; // Status of the letter
  readonly savedAt?: number; // Timestamp when saved
  readonly id?: string; // Unique ID for tracking
}

// User preferences for personalization
export interface UserPreferences {
  readonly fullName?: string;
  readonly idNumber?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly city?: string;
  readonly preferredTone?: LetterTone;
  readonly fontSize?: "small" | "medium" | "large" | "xlarge";
  readonly rememberMe?: boolean;
}
