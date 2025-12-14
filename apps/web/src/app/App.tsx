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
const LawyersPage = lazy(() => import("../pages/LawyersPage").then((m) => ({ default: m.LawyersPage })));
const LawyerProfilePage = lazy(() =>
  import("../pages/LawyerProfilePage").then((m) => ({ default: m.LawyerProfilePage })),
);
const LettersPage = lazy(() => import("../pages/LettersPage").then((m) => ({ default: m.LettersPage })));
const RightsPage = lazy(() => import("../pages/RightsPage").then((m) => ({ default: m.RightsPage })));

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
            <Route path="/lawyers" element={<LawyersPage />} />
            <Route path="/lawyers/:id" element={<LawyerProfilePage />} />
            <Route path="/letters" element={<LettersPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <FloatingActions />
        </AppLayout>
      </Suspense>
    </ShabbatGate>
  );
}


