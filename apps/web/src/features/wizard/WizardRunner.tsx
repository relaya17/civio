import { useEffect, useMemo } from "react";
import type { WizardDefinition, WizardStep } from "@repo/types";
import { Box, Button, Chip, Container, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useWizardStore } from "./wizardStore";
import { useFeatureFlagsStore } from "../../state/featureFlagsStore";

function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function speak(text: string) {
  if (!canSpeak()) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "he-IL";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function WizardQuestion({
  step,
  value,
  onSelect,
}: {
  step: WizardStep;
  value: string | undefined;
  onSelect: (v: string) => void;
}) {
  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 800 }}>
        {step.question}
      </Typography>
      <Typography sx={{ color: "text.secondary" }}>{step.whyAsking}</Typography>

      <Stack spacing={1}>
        {step.options.map((opt) => (
          <Button
            key={opt.value}
            variant={value === opt.value ? "contained" : "outlined"}
            size="large"
            onClick={() => onSelect(opt.value)}
            aria-label={opt.ariaLabel ?? opt.label}
            sx={{
              justifyContent: "space-between",
              textAlign: "start",
              py: 1.4,
              borderRadius: 3,
            }}
          >
            {opt.label}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}

function WizardSummary({ wizard }: { wizard: WizardDefinition }) {
  const answers = useWizardStore((s) => s.answers);

  const answeredSteps = wizard.steps
    .map((step) => ({ step, value: answers[step.id] }))
    .filter((x) => typeof x.value === "string");

  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 900 }}>
        סיכום
      </Typography>

      <Typography sx={{ color: "text.secondary" }}>
        {wizard.disclaimer.short}
      </Typography>

      <Divider />

      <Stack spacing={1}>
        {answeredSteps.map(({ step, value }) => {
          const label = step.options.find((o) => o.value === value)?.label ?? value;
          return (
            <Box key={step.id} sx={{ display: "grid", gap: 0.5 }}>
              <Typography sx={{ fontWeight: 700 }}>{step.title}</Typography>
              <Typography sx={{ color: "text.secondary" }}>{label}</Typography>
            </Box>
          );
        })}
      </Stack>

      <Divider />

      <Typography sx={{ fontWeight: 800 }}>מקורות (מידע רשמי)</Typography>
      <Stack spacing={1}>
        {wizard.sources.map((s) => (
          <Box key={s.url} sx={{ display: "grid", gap: 0.25 }}>
            <Typography component="a" href={s.url} target="_blank" rel="noreferrer">
              {s.title}
            </Typography>
            <Typography sx={{ color: "text.secondary" }} variant="body2">
              עודכן לאחרונה: {s.lastReviewedISODate}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Divider />

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {wizard.disclaimer.full}
      </Typography>
    </Stack>
  );
}

export function WizardRunner({ wizard }: { wizard: WizardDefinition }) {
  const loadWizard = useWizardStore((s) => s.loadWizard);
  const stepIndex = useWizardStore((s) => s.stepIndex);
  const answers = useWizardStore((s) => s.answers);
  const back = useWizardStore((s) => s.back);
  const next = useWizardStore((s) => s.next);
  const reset = useWizardStore((s) => s.reset);
  const answer = useWizardStore((s) => s.answer);

  const ttsEnabled = useFeatureFlagsStore((s) => s.flags["tts.enabled"]);

  useEffect(() => {
    loadWizard(wizard);
  }, [loadWizard, wizard]);

  const stepsCount = wizard.steps.length;
  const isSummary = stepIndex >= stepsCount;
  const currentStep = wizard.steps[Math.min(stepIndex, stepsCount - 1)];
  const currentValue = currentStep ? answers[currentStep.id] : undefined;

  const progress = useMemo(() => {
    if (isSummary) return 100;
    return Math.round(((stepIndex + 1) / (stepsCount + 1)) * 100);
  }, [isSummary, stepIndex, stepsCount]);

  const canGoNext = useMemo(() => {
    if (isSummary) return false;
    if (!currentStep) return false;
    return typeof answers[currentStep.id] === "string";
  }, [answers, currentStep, isSummary]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {wizard.title}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>{wizard.description}</Typography>

        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap" }}>
          <Chip label={`שלב ${Math.min(stepIndex + 1, stepsCount + 1)} מתוך ${stepsCount + 1}`} />
          <Chip label={wizard.disclaimer.short} variant="outlined" />
        </Stack>

        <LinearProgress variant="determinate" value={progress} aria-label="התקדמות" />

        {isSummary ? (
          <WizardSummary wizard={wizard} />
        ) : currentStep ? (
          <>
            {ttsEnabled && canSpeak() ? (
              <Button
                variant="text"
                startIcon={<VolumeUpIcon />}
                onClick={() => speak(`${currentStep.question}. ${currentStep.whyAsking}`)}
                aria-label="הקראה"
                sx={{ alignSelf: "flex-start" }}
              >
                הקראה
              </Button>
            ) : null}

            <WizardQuestion
              step={currentStep}
              value={currentValue}
              onSelect={(v) => {
                answer(currentStep.id, v);
              }}
            />
          </>
        ) : null}

        <Divider sx={{ mt: 2 }} />

        <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => back()}
            disabled={stepIndex === 0}
            aria-label="חזרה"
          >
            חזרה
          </Button>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<RestartAltIcon />}
              onClick={() => reset()}
              aria-label="איפוס"
            >
              איפוס
            </Button>

            <Button onClick={() => next()} disabled={!isSummary && !canGoNext} aria-label="המשך">
              {isSummary ? "סיום" : "המשך"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}


