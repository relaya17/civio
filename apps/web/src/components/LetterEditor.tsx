import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Stack,
  Typography,
  Alert,
} from "@mui/material";
import type { GeneratedLetter } from "@repo/types";

interface LetterEditorProps {
  readonly open: boolean;
  readonly letter: GeneratedLetter | null;
  readonly onClose: () => void;
  readonly onSave: (editedText: string) => void;
}

/**
 * Manual letter editor for preview step
 * Allows users to edit the generated letter before saving/sending
 */
export function LetterEditor({ open, letter, onClose, onSave }: LetterEditorProps) {
  const [editedText, setEditedText] = useState(letter?.bodyText || "");

  // Update edited text when letter changes
  if (letter && editedText !== letter.bodyText && !open) {
    setEditedText(letter.bodyText);
  }

  const handleSave = () => {
    if (editedText.trim()) {
      onSave(editedText);
      onClose();
    }
  };

  if (!letter) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>עריכת מכתב</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Alert severity="info">
            אפשר לערוך את המכתב לפני השמירה או השליחה. כל שינוי ישפיע על המכתב הסופי.
          </Alert>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>
              נושא: {letter.subject}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
              {letter.disclaimer}
            </Typography>
          </Box>

          <TextField
            label="גוף המכתב"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            multiline
            minRows={15}
            maxRows={30}
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                fontFamily: "inherit",
                fontSize: "inherit",
              },
            }}
          />

          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            💡 טיפ: ודאי שהמכתב ברור, מכבד ומכיל את כל הפרטים הנדרשים.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button variant="contained" onClick={handleSave} disabled={!editedText.trim()}>
          שמור שינויים
        </Button>
      </DialogActions>
    </Dialog>
  );
}
