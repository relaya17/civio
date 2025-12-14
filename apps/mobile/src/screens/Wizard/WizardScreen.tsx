import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { LayoutAnimation, Platform, UIManager, View } from "react-native";
import { Button, ProgressBar, Text } from "react-native-paper";
import { colors, spacing } from "@civio/design-tokens";
import type { RootStackParamList } from "../../navigation/types";
import { StepAge } from "./steps/StepAge";
import { StepEmployment } from "./steps/StepEmployment";
import { StepSituation } from "./steps/StepSituation";
import type { AgeRangeId, EmploymentStatusId, SituationId, WizardContext } from "./steps/types";

type Props = NativeStackScreenProps<RootStackParamList, "Wizard">;

function enableLayoutAnimation() {
  if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

function computeStatus(ctx: WizardContext): "possible" | "uncertain" | "none" {
  // Placeholder heuristic until server/AI integration.
  if (ctx.situation === "unsure" || ctx.employmentStatus === "unsure" || ctx.ageRange === "unsure") return "uncertain";
  return "possible";
}

export function WizardScreen({ navigation }: Props) {
  useEffect(() => {
    enableLayoutAnimation();
  }, []);

  const [step, setStep] = useState(0);
  const [situation, setSituation] = useState<SituationId | null>(null);
  const [employmentStatus, setEmploymentStatus] = useState<EmploymentStatusId | null>(null);
  const [ageRange, setAgeRange] = useState<AgeRangeId | null>(null);

  const totalSteps = 3;
  const progress = (step + 1) / totalSteps;

  function goNext() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function goBack() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStep((s) => Math.max(s - 1, 0));
  }

  function finish() {
    if (!situation || !employmentStatus || !ageRange) return;
    const ctx: WizardContext = { situation, employmentStatus, ageRange };
    const status = computeStatus(ctx);
    navigation.navigate("WizardResults", { status, context: ctx });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg, gap: spacing.sm }}>
        <Text variant="titleMedium" style={{ color: colors.textSecondary }}>
          בדיקת זכויות
        </Text>
        <ProgressBar progress={progress} color={colors.secondary} />
      </View>

      {step === 0 ? (
        <StepSituation
          onSelect={(id) => {
            setSituation(id);
            goNext();
          }}
        />
      ) : null}

      {step === 1 ? (
        <StepEmployment
          onSelect={(id) => {
            setEmploymentStatus(id);
            goNext();
          }}
        />
      ) : null}

      {step === 2 ? (
        <StepAge
          onSelect={(id) => {
            setAgeRange(id);
            finish();
          }}
        />
      ) : null}

      <View style={{ padding: spacing.lg, flexDirection: "row", gap: spacing.sm }}>
        <Button mode="outlined" onPress={goBack} disabled={step === 0} accessibilityLabel="חזרה">
          חזרה
        </Button>
        <View style={{ flex: 1 }} />
        <Button mode="text" onPress={() => navigation.goBack()} accessibilityLabel="סגירה">
          סגירה
        </Button>
      </View>
    </View>
  );
}


