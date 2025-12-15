import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import type { LetterFeedback } from "../state/savedLettersStore";

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (feedback: LetterFeedback, note?: string) => void;
  letterSubject: string;
}

export function FeedbackDialog({ open, onClose, onSubmit, letterSubject }: FeedbackDialogProps) {
  const [feedback, setFeedback] = useState<LetterFeedback>(null);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (feedback) {
      onSubmit(feedback, note.trim() || undefined);
      setFeedback(null);
      setNote("");
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>דירוג מכתב: {letterSubject}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            עזור לנו ולמשתמשים אחרים - מה קרה אחרי ששלחת את המכתב?
          </Typography>

          <FormControl>
            <FormLabel>מה קרה?</FormLabel>
            <RadioGroup value={feedback || ""} onChange={(e) => setFeedback(e.target.value as LetterFeedback)}>
              <FormControlLabel value="response-received" control={<Radio />} label="✅ קיבלתי מענה מלא ומנומק" />
              <FormControlLabel value="partial-response" control={<Radio />} label="⚠️ קיבלתי מענה חלקי / לא מספק" />
              <FormControlLabel value="no-response" control={<Radio />} label="❌ לא קיבלתי מענה" />
            </RadioGroup>
          </FormControl>

          <TextField
            label="הערה נוספת (אופציונלי)"
            multiline
            minRows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="למשל: כמה זמן לקח לקבל מענה, מה היה המענה..."
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!feedback}>
          שמירה
        </Button>
      </DialogActions>
    </Dialog>
  );
}
