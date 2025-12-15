import { Box, Stack, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockIcon from "@mui/icons-material/Lock";
import SpeedIcon from "@mui/icons-material/Speed";

const badges = [
  {
    icon: <LockIcon sx={{ fontSize: 32, color: "primary.main" }} />,
    text: "100% פרטי",
    description: "כל המידע נשמר אצלכם בלבד",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 32, color: "primary.main" }} />,
    text: "בטוח",
    description: "ללא שליחה אוטומטית",
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 32, color: "primary.main" }} />,
    text: "מהיר",
    description: "תוך 5 דקות מוכן",
  },
  {
    icon: <VerifiedUserIcon sx={{ fontSize: 32, color: "primary.main" }} />,
    text: "מוכח",
    description: "שיעור הצלחה גבוה",
  },
];

export function TrustBadges() {
  return (
    <Box sx={{ py: 4, px: 2, bgcolor: "background.paper", borderTop: "1px solid", borderColor: "divider" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={3}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          maxWidth: 1000,
          mx: "auto",
        }}
      >
        {badges.map((badge, index) => (
          <Box key={index} sx={{ textAlign: "center", flex: 1, minWidth: 150 }}>
            <Box sx={{ mb: 1 }}>{badge.icon}</Box>
            <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
              {badge.text}
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              {badge.description}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
