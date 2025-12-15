import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { ShabbatGate } from "./components/ShabbatGate";
import { FloatingActions } from "./components/FloatingActions";
import { AppLayout } from "./components/AppLayout";

const HomePage = lazy(() => import("../pages/HomePage").then((m) => ({ default: m.HomePage })));
const WizardEmployeeTerminationPage = lazy(() =>
  import("../pages/WizardEmployeeTerminationPage").then((m) => ({
    default: m.WizardEmployeeTerminationPage,
  })),
);
const WizardGeneralPage = lazy(() =>
  import("../pages/WizardGeneralPage").then((m) => ({
    default: m.WizardGeneralPage,
  })),
);
const LawyersPage = lazy(() => import("../pages/LawyersPage").then((m) => ({ default: m.LawyersPage })));
const LawyerProfilePage = lazy(() =>
  import("../pages/LawyerProfilePage").then((m) => ({ default: m.LawyerProfilePage })),
);
const LettersPage = lazy(() => import("../pages/LettersPage").then((m) => ({ default: m.LettersPage })));
const MyLettersPage = lazy(() => import("../pages/MyLettersPage").then((m) => ({ default: m.MyLettersPage })));
const StatisticsPage = lazy(() => import("../pages/StatisticsPage").then((m) => ({ default: m.StatisticsPage })));
const RightsPage = lazy(() => import("../pages/RightsPage").then((m) => ({ default: m.RightsPage })));
const TermsPage = lazy(() => import("../pages/TermsPage").then((m) => ({ default: m.TermsPage })));

export function App() {
  return (
    <ShabbatGate>
      <Suspense
        fallback={
          <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center" }}>
            <CircularProgress aria-label="טוען" />
          </Box>
        }
      >
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rights" element={<RightsPage />} />
            <Route path="/w/employee-termination" element={<WizardEmployeeTerminationPage />} />
            <Route path="/w" element={<WizardGeneralPage />} />
            <Route path="/lawyers" element={<LawyersPage />} />
            <Route path="/lawyers/:id" element={<LawyerProfilePage />} />
            <Route path="/letters" element={<LettersPage />} />
            <Route path="/my-letters" element={<MyLettersPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <FloatingActions />
        </AppLayout>
      </Suspense>
    </ShabbatGate>
  );
}


