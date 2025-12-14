export type RightsAuthorityId =
  | "labor"
  | "housing-ministry"
  | "amidar"
  | "welfare-bureau"
  | "legal-aid"
  | "national-insurance"
  | "transport-ministry"
  | "health-ministry"
  | "rehabilitation-authority"
  | "education-ministry"
  | "immigration-ministry"
  | "disability-commission"
  | "equal-rights-commission";

export interface RightsAuthority {
  readonly id: RightsAuthorityId;
  readonly label: string;
  readonly description?: string;
}

export type RightCategoryId =
  | "labor"
  | "housing"
  | "welfare"
  | "legal-aid"
  | "national-insurance"
  | "health-mobility"
  | "rehabilitation"
  | "homelessness"
  | "women-rights"
  | "children-rights"
  | "elderly-rights"
  | "disability-rights"
  | "immigration-rights"
  | "education-rights";

export interface RightCategory {
  readonly id: RightCategoryId;
  readonly label: string;
  readonly description?: string;
}

export type RightsTopicId =
  | "labor-termination"
  | "labor-wages"
  | "housing-public"
  | "housing-rent-assistance"
  | "housing-amidar"
  | "welfare-support"
  | "legal-aid"
  | "btl-disability"
  | "btl-mobility"
  | "parking-badge"
  | "rehabilitation-ex-prisoner"
  | "homeless-support";

export interface RightsTopic {
  readonly id: RightsTopicId;
  readonly label: string;
  readonly authorityIds: readonly RightsAuthorityId[];
}

export interface RightSource {
  readonly title: string;
  readonly url: string;
  readonly publisher?: string;
}

export interface RightItem {
  readonly id: string;
  readonly categoryId: RightCategoryId;
  readonly authorityId: RightsAuthorityId;
  readonly topicId: RightsTopicId;
  readonly title: string;
  readonly summary: string;
  readonly steps: readonly string[];
  readonly notes?: string;
  readonly whoCanHelp?: readonly string[];
  readonly sources: readonly RightSource[];
  readonly lastReviewedISO: string; // yyyy-mm-dd
  readonly reviewIntervalDays?: number;
  readonly tags?: readonly string[];
  // שדות נוספים לבינה מלאכותית
  readonly keywords?: readonly string[]; // מילות מפתח לחיפוש סמנטי
  readonly faqs?: readonly { question: string; answer: string }[]; // שאלות נפוצות
  readonly commonScenarios?: readonly string[]; // תרחישים נפוצים
  readonly eligibilityCriteria?: readonly string[]; // קריטריוני זכאות בסיסיים
  readonly relatedRightsIds?: readonly string[]; // זכויות קשורות
  readonly aiContext?: string; // הקשר נוסף לבינה מלאכותית (תיאור מפורט יותר)
}


