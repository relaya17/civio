export type LetterAuthorityId = "general" | "state-comptroller" | "welfare-bureau" | "housing-ministry" | "amidar" | "national-insurance" | "health-fund" | "municipality";
export type LetterKindId = "complaint" | "request-info" | "request-meeting" | "appeal-objection" | "request-documents";
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
}
export interface GeneratedLetter {
    readonly subject: string;
    readonly bodyText: string;
    readonly disclaimer: string;
}
//# sourceMappingURL=letters.d.ts.map