export type RootStackParamList = {
  Home: undefined;
  Wizard: undefined;
  WizardResults: {
    status: "possible" | "uncertain" | "none";
    context: {
      situation: "unemployment" | "disability" | "debt" | "financial-support" | "unsure";
      employmentStatus: "not-working" | "part-time" | "working" | "unsure";
      ageRange: "under-18" | "18-25" | "26-60" | "over-60" | "unsure";
    };
  };
  Lawyers: undefined;
  LawyerProfile: { id: string };
  Letters: undefined;
};


