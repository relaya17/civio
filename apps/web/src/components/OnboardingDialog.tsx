import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

interface OnboardingDialogProps {
  open: boolean;
  onClose: () => void;
  onRememberMeChange: (remember: boolean) => void;
}

export function OnboardingDialog({ open, onClose, onRememberMeChange }: OnboardingDialogProps) {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ textAlign: "center", pb: 1 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          ברוכים הבאים למגדלור
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ py: 2 }}>
          <Box
            sx={{
              bgcolor: "primary.light",
              borderRadius: 2,
              p: 2,
              border: "1px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography sx={{ fontWeight: 700, mb: 1 }}>מה אנחנו עושים?</Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              אנחנו עוזרים לכם לנסח פנייה ברורה ומכבדת לרשויות וגופים ציבוריים. כלי עזר בלבד – לא ייעוץ משפטי.
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 700, mb: 1 }}>מה חשוב לדעת?</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">✓ כל פנייה נשמרת אצלכם במכשיר – פרטיות מלאה</Typography>
              <Typography variant="body2">✓ אנחנו לא שולחים שום דבר – אתם שולטים</Typography>
              <Typography variant="body2">✓ מידע כללי בלבד – לא תחליף לייעוץ משפטי</Typography>
              <Typography variant="body2">✓ חינם לחלוטין – ללא עלויות נסתרות</Typography>
            </Stack>
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => {
                  setRememberMe(e.target.checked);
                  onRememberMeChange(e.target.checked);
                }}
              />
            }
            label="זכור את הפרטים שלי למכתבים הבאים (שם, פרטי קשר, העדפות)"
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained" fullWidth size="large">
          התחלה
        </Button>
      </DialogActions>
    </Dialog>
  );
}
