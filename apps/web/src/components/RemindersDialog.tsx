import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Chip,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSavedLettersStore } from "../state/savedLettersStore";
import { checkReminders, type Reminder } from "../services/reminders";

interface RemindersDialogProps {
  readonly open: boolean;
  readonly onClose: () => void;
}

export function RemindersDialog({ open, onClose }: RemindersDialogProps) {
  const navigate = useNavigate();
  const letters = useSavedLettersStore((s) => s.letters);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    if (open) {
      setReminders(checkReminders(letters));
    }
  }, [open, letters]);

  const handleCreateReminder = () => {
    // Navigate to letters page with pre-filled data
    navigate("/letters");
    onClose();
    // TODO: Pre-fill letter form with reminder data
  };

  if (reminders.length === 0) {
    return (
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>תזכורות</DialogTitle>
        <DialogContent>
          <Alert severity="success">כל המכתבים שלך מעודכנים. אין תזכורות כרגע.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>סגור</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6">תזכורות חכמות</Typography>
          <Chip label={reminders.length} color="warning" size="small" />
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Alert severity="info">
            מצאנו מכתבים שלא קיבלו מענה. מומלץ לשלוח תזכורת או מכתב המשך.
          </Alert>

          <List>
            {reminders.map((reminder) => (
              <ListItem
                key={reminder.letterId}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  mb: 1,
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                  <ListItemText
                    primary={reminder.letterSubject}
                    secondary={`${reminder.daysSinceSent} ימים מאז השליחה`}
                  />
                  <Chip
                    label={
                      reminder.suggestedAction === "appeal"
                        ? "ערעור"
                        : reminder.suggestedAction === "escalation"
                          ? "הסלמה"
                          : "תזכורת"
                    }
                    color={reminder.suggestedAction === "appeal" ? "error" : reminder.suggestedAction === "escalation" ? "warning" : "info"}
                    size="small"
                  />
                </Box>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                  {reminder.message}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={handleCreateReminder}
                >
                  צור מכתב תזכורת
                </Button>
              </ListItem>
            ))}
          </List>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>סגור</Button>
        <Button variant="contained" onClick={() => navigate("/my-letters")}>
          המכתבים שלי
        </Button>
      </DialogActions>
    </Dialog>
  );
}
