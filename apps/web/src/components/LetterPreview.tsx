import { Box, Paper, Stack, Typography } from "@mui/material";
import type { GeneratedLetter } from "@repo/types";

interface LetterPreviewProps {
  readonly letter: GeneratedLetter;
  readonly fullName?: string;
  readonly editedText?: string | null;
}

/**
 * Enhanced letter preview that shows exactly how the letter will look
 * Mimics a real letter format with proper spacing and layout
 */
export function LetterPreview({ letter, fullName, editedText }: LetterPreviewProps) {
  const displayText = editedText || letter.bodyText;

  return (
    <Paper
      variant="outlined"
      sx={{
        p: { xs: 2, sm: 4 },
        bgcolor: "background.paper",
        maxWidth: "210mm", // A4 width
        mx: "auto",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <Stack spacing={3} sx={{ fontFamily: "inherit" }}>
        {/* Letter Header */}
        <Box sx={{ textAlign: "right" }}>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
            {new Date().toLocaleDateString("he-IL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Typography>
        </Box>

        {/* Letter Body */}
        <Box
          sx={{
            minHeight: "200px",
            lineHeight: 1.8,
            fontSize: "1rem",
            whiteSpace: "pre-wrap",
            fontFamily: "inherit",
            color: "text.primary",
          }}
        >
          {displayText}
        </Box>

        {/* Letter Footer */}
        <Box sx={{ mt: 4, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
          <Stack spacing={1}>
            {fullName && (
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {fullName}
              </Typography>
            )}
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {letter.disclaimer}
            </Typography>
          </Stack>
        </Box>

        {/* Print hint */}
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            bgcolor: "info.light",
            borderRadius: 1,
            display: { xs: "block", md: "none" },
          }}
        >
          <Typography variant="caption" sx={{ color: "info.dark" }}>
            💡 טיפ: להדפסה איכותית, השתמשי בכפתור "הדפסה / שמירה כ‑PDF"
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
