import { WizardRunner } from "../features/wizard/WizardRunner";
import { generalRightsWizard } from "@repo/logic";

export function WizardGeneralPage() {
  return <WizardRunner wizard={generalRightsWizard} />;
}

