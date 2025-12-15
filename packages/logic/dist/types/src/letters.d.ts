export type LetterAuthorityId = "general" | "state-comptroller" | "welfare-bureau" | "housing-ministry" | "amidar" | "national-insurance" | "health-fund" | "municipality";
export type LetterKindId = "complaint" | "request-info" | "request-meeting" | "appeal-objection" | "request-documents";
export type LetterSituation = "first-contact" | "no-response" | "appeal" | "warning";
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
    readonly dateISO: string;
    readonly tone?: LetterTone;
    readonly urgency?: LetterUrgency;
    readonly eventDateISO?: string;
    readonly firstContactDateISO?: string;
    readonly secondContactDateISO?: string;
    readonly noResponse?: boolean;
    readonly useLegalTone?: boolean;
    readonly situation?: LetterSituation;
}
export interface GeneratedLetter {
    readonly subject: string;
    readonly bodyText: string;
    readonly disclaimer: string;
    readonly status?: LetterStatus;
    readonly savedAt?: number;
    readonly id?: string;
}
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
//# sourceMappingURL=letters.d.ts.map