import { Alert, AlertTitle, Box, Button, Stack, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface EmergencyInfoProps {
  readonly urgency?: "normal" | "high";
}

export function EmergencyInfo({ urgency }: EmergencyInfoProps) {
  const navigate = useNavigate();

  if (urgency !== "high") {
    return null;
  }

  const emergencyContacts = [
    { name: "קו חם לזכויות אזרח", phone: "02-6708811", link: "tel:026708811" },
    { name: "משרד המשפטים - שירות לאזרח", phone: "1-800-22-33-44", link: "tel:1800223344" },
    { name: "נציבות שוויון זכויות", phone: "1-800-200-200", link: "tel:1800200200" },
  ];

  return (
    <Alert severity="warning" sx={{ mt: 2 }}>
      <AlertTitle>מצב דחוף - עזרה זמינה</AlertTitle>
      <Stack spacing={2} sx={{ mt: 1 }}>
        <Typography variant="body2">
          אם הפנייה שלך דחופה מאוד או שיש לך חשש לזכויותיך, יש מספרי סיוע זמינים:
        </Typography>
        <Box>
          {emergencyContacts.map((contact) => (
            <Box key={contact.name} sx={{ mb: 1 }}>
              <Typography variant="body2" component="span" sx={{ fontWeight: 700 }}>
                {contact.name}:
              </Typography>{" "}
              <Link href={contact.link} sx={{ textDecoration: "none" }}>
                {contact.phone}
              </Link>
            </Box>
          ))}
        </Box>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/rights")}
          sx={{ alignSelf: "flex-start" }}
        >
          מידע נוסף על זכויות
        </Button>
      </Stack>
    </Alert>
  );
}
