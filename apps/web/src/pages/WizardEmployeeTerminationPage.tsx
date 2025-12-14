import { Navigate } from "react-router-dom";
import { WizardRunner } from "../features/wizard/WizardRunner";
import { employeeTerminationWizard } from "@repo/logic";
import { useFeatureFlagsStore } from "../state/featureFlagsStore";

export function WizardEmployeeTerminationPage() {
  const enabled = useFeatureFlagsStore((s) => s.flags["wizard.employeeTermination"]);
  if (!enabled) return <Navigate to="/" replace />;
  return <WizardRunner wizard={employeeTerminationWizard} />;
}


