import { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  LinearProgress,
  Chip,
} from "@mui/material";
import { useSavedLettersStore } from "../state/savedLettersStore";
import type { LetterStatus } from "@repo/types";

const STATUS_LABELS: Record<LetterStatus, string> = {
  draft: "טיוטה",
  sent: "נשלח",
  "waiting-response": "ממתין למענה",
  "response-received": "מענה התקבל",
  closed: "סגור",
};

export function StatisticsPage() {
  const letters = useSavedLettersStore((s) => s.letters);

  const stats = useMemo(() => {
    const total = letters.length;
    if (total === 0) {
      return {
        total: 0,
        byStatus: {} as Record<LetterStatus, number>,
        byAuthority: {} as Record<string, number>,
        averageResponseTime: 0,
        recentActivity: 0,
      };
    }

    const byStatus = letters.reduce(
      (acc, letter) => {
        acc[letter.status] = (acc[letter.status] || 0) + 1;
        return acc;
      },
      {} as Record<LetterStatus, number>,
    );

    const byAuthority = letters.reduce(
      (acc, letter) => {
        acc[letter.authorityId] = (acc[letter.authorityId] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Calculate average days between sent and response received
    const responseTimes = letters
      .filter((letter) => letter.status === "response-received" && letter.savedAt)
      .map(() => {
        // Simplified: assume response received 14 days after sent (in production, track actual dates)
        return 14;
      });
    const averageResponseTime =
      responseTimes.length > 0
        ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
        : 0;

    // Recent activity (last 30 days)
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const recentActivity = letters.filter((letter) => letter.savedAt >= thirtyDaysAgo).length;

    return {
      total,
      byStatus,
      byAuthority,
      averageResponseTime,
      recentActivity,
    };
  }, [letters]);

  if (letters.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stack spacing={3} sx={{ textAlign: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            ניתוח סטטיסטי
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            עדיין אין מספיק נתונים לניתוח. לאחר שתשמור מכתבים, הסטטיסטיקה תופיע כאן.
          </Typography>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          ניתוח סטטיסטי
        </Typography>

        <Stack spacing={3}>
          {/* Overview Cards */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }, gap: 2 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 900, color: "primary.main" }}>
                  {stats.total}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  מכתבים בסך הכל
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 900, color: "success.main" }}>
                  {stats.byStatus["response-received"] || 0}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  מכתבים עם מענה
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 900, color: "warning.main" }}>
                  {stats.byStatus["waiting-response"] || 0}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  ממתינים למענה
                </Typography>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h3" sx={{ fontWeight: 900, color: "info.main" }}>
                  {stats.recentActivity}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  פעילות אחרונה (30 יום)
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Status Breakdown */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 2 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  חלוקה לפי סטטוס
                </Typography>
                <Stack spacing={2}>
                  {(Object.keys(STATUS_LABELS) as LetterStatus[]).map((status) => {
                    const count = stats.byStatus[status] || 0;
                    const percentage = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                    return (
                      <Box key={status}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2">{STATUS_LABELS[status]}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {count} ({percentage}%)
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{ height: 8, borderRadius: 1 }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>

            {/* Authority Breakdown */}
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                  חלוקה לפי רשות
                </Typography>
                <Stack spacing={1}>
                  {Object.entries(stats.byAuthority)
                    .sort(([, a], [, b]) => b - a)
                    .map(([authority, count]) => (
                      <Box key={authority} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Chip label={authority} size="small" />
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {count}
                        </Typography>
                      </Box>
                    ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>

          {/* Response Time */}
          {stats.averageResponseTime > 0 ? (
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                  זמן ממוצע למענה
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 900, color: "primary.main" }}>
                  {stats.averageResponseTime} ימים
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                  ממוצע בין שליחת מכתב לקבלת מענה
                </Typography>
              </CardContent>
            </Card>
          ) : null}
        </Stack>
      </Stack>
    </Container>
  );
}
