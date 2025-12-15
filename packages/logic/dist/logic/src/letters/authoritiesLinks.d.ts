/**
 * Relevant information links for each authority type
 * Helps users understand their rights and relevant laws
 */
import type { LetterAuthorityId } from "@repo/types";
export interface AuthorityLink {
    readonly title: string;
    readonly url: string;
    readonly description?: string;
}
export interface AuthorityInfo {
    readonly authorityId: LetterAuthorityId;
    readonly links: readonly AuthorityLink[];
    readonly tips: readonly string[];
    readonly relevantLaws: readonly string[];
}
/**
 * Get relevant information links for an authority
 */
export declare function getAuthorityInfo(authorityId: LetterAuthorityId): AuthorityInfo;
/**
 * Get tips for dealing with an authority
 */
export declare function getAuthorityTips(authorityId: LetterAuthorityId): readonly string[];
/**
 * Get relevant laws for an authority
 */
export declare function getAuthorityLaws(authorityId: LetterAuthorityId): readonly string[];
//# sourceMappingURL=authoritiesLinks.d.ts.map