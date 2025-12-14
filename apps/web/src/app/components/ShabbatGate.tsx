import type { PropsWithChildren } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { getShabbatGateNow } from "@repo/utils";
import { useFeatureFlagsStore } from "../../state/featureFlagsStore";

export function ShabbatGate({ children }: PropsWithChildren) {
  const shabbatGateEnabled = useFeatureFlagsStore((s) => s.flags["shabbatGate.enabled"]);
  const { isShabbat } = getShabbatGateNow();

  if (shabbatGateEnabled && isShabbat) {
    return (
      <Box sx={{ minHeight: "100dvh", display: "grid", placeItems: "center", px: 2 }}>
        <Container maxWidth="sm">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            המערכת אינה פעילה בשבת
          </Typography>
          <Typography sx={{ mb: 3, color: "text.secondary" }}>
            נשמח לעמוד לשירותך במוצאי שבת.
          </Typography>
          <Typography sx={{ mb: 2 }}>
            כרגע ניתן לעיין במידע בלבד. פעולות אינטראקטיביות מושבתות.
          </Typography>
          <Button
            variant="outlined"
            onClick={() => window.location.reload()}
            aria-label="בדיקה מחדש"
          >
            בדיקה מחדש
          </Button>
        </Container>
      </Box>
    );
  }

  return <>{children}</>;
}


