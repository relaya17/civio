import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  IconButton,
  Stack,
  Typography,
  Menu,
  MenuItem,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { LetterCardSkeleton } from "../components/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FeedbackIcon from "@mui/icons-material/Feedback";
import type { LetterStatus } from "@repo/types";
import { useSavedLettersStore } from "../state/savedLettersStore";
import { FeedbackDialog } from "../components/FeedbackDialog";

const STATUS_LABELS: Record<LetterStatus, string> = {
  draft: "טיוטה",
  sent: "נשלח",
  "waiting-response": "ממתין למענה",
  "response-received": "מענה התקבל",
  closed: "סגור",
};

const STATUS_COLORS: Record<LetterStatus, "default" | "primary" | "success" | "warning" | "error"> = {
  draft: "default",
  sent: "primary",
  "waiting-response": "warning",
  "response-received": "success",
  closed: "default",
};

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function MyLettersPage() {
  const navigate = useNavigate();
  const letters = useSavedLettersStore((s) => s.letters);
  const updateLetterStatus = useSavedLettersStore((s) => s.updateLetterStatus);
  const updateLetterFeedback = useSavedLettersStore((s) => s.updateLetterFeedback);
  const deleteLetter = useSavedLettersStore((s) => s.deleteLetter);
  const loadLetters = useSavedLettersStore((s) => s.loadLetters);
  const [anchorEl, setAnchorEl] = useState<{ id: string; el: HTMLElement } | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<string | null>(null);
  const [feedbackDialog, setFeedbackDialog] = useState<string | null>(null);

  useEffect(() => {
    loadLetters();
  }, [loadLetters]);

  const handleStatusChange = (id: string, status: LetterStatus) => {
    updateLetterStatus(id, status);
    setAnchorEl(null);
  };

  const handleDelete = (id: string) => {
    deleteLetter(id);
    setDeleteDialog(null);
  };

              if (letters.length === 0) {
                return (
                  <Container maxWidth="md" sx={{ py: 6 }}>
                    <Stack spacing={3} sx={{ textAlign: "center" }}>
                      <Typography variant="h4" sx={{ fontWeight: 900 }}>
                        המכתבים שלי
                      </Typography>
                      <Alert severity="info">
                        עדיין לא שמרת מכתבים. לאחר שתכתוב מכתב ותשמור אותו, הוא יופיע כאן.
                      </Alert>
                      <Button variant="contained" onClick={() => navigate("/letters")}>
                        כתיבת מכתב חדש
                      </Button>
                    </Stack>
                  </Container>
                );
              }

              // Show loading skeleton while letters are being loaded
              if (letters.length === 0 && !letters) {
                return (
                  <Container maxWidth="md" sx={{ py: 6 }}>
                    <Stack spacing={2}>
                      <LetterCardSkeleton />
                      <LetterCardSkeleton />
                      <LetterCardSkeleton />
                    </Stack>
                  </Container>
                );
              }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            המכתבים שלי ({letters.length})
          </Typography>
          <Button variant="contained" onClick={() => navigate("/letters")}>
            מכתב חדש
          </Button>
        </Box>

        <Stack spacing={2}>
          {letters
            .sort((a, b) => b.savedAt - a.savedAt)
            .map((letter) => (
              <Card key={letter.id} variant="outlined">
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                          {letter.subject}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>
                          {letter.authorityId} • {formatDate(letter.savedAt)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
                          {letter.fullName}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => setAnchorEl({ id: letter.id, el: e.currentTarget })}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}>
                      <Chip
                        label={STATUS_LABELS[letter.status]}
                        color={STATUS_COLORS[letter.status]}
                        size="small"
                      />
                      {letter.feedback ? (
                        <Chip
                          label={
                            letter.feedback === "response-received"
                              ? "✅ קיבלתי מענה"
                              : letter.feedback === "partial-response"
                                ? "⚠️ מענה חלקי"
                                : "❌ אין מענה"
                          }
                          size="small"
                          color={letter.feedback === "response-received" ? "success" : "warning"}
                        />
                      ) : null}
                      {letter.status === "sent" || letter.status === "waiting-response" ? (
                        <Button
                          size="small"
                          variant="outlined"
                          color="secondary"
                          startIcon={<FeedbackIcon />}
                          onClick={() => setFeedbackDialog(letter.id)}
                        >
                          דירוג
                        </Button>
                      ) : null}
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => {
                          // TODO: Navigate to edit mode
                          navigate("/letters");
                        }}
                      >
                        צפייה
                      </Button>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {letter.bodyText.substring(0, 150)}...
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
        </Stack>

        <Menu
          anchorEl={anchorEl?.el}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={() => anchorEl && handleStatusChange(anchorEl.id, "draft")}>
            סטטוס: טיוטה
          </MenuItem>
          <MenuItem onClick={() => anchorEl && handleStatusChange(anchorEl.id, "sent")}>
            סטטוס: נשלח
          </MenuItem>
          <MenuItem onClick={() => anchorEl && handleStatusChange(anchorEl.id, "waiting-response")}>
            סטטוס: ממתין למענה
          </MenuItem>
          <MenuItem onClick={() => anchorEl && handleStatusChange(anchorEl.id, "response-received")}>
            סטטוס: מענה התקבל
          </MenuItem>
          <MenuItem onClick={() => anchorEl && handleStatusChange(anchorEl.id, "closed")}>
            סטטוס: סגור
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (anchorEl) {
                setAnchorEl(null);
                setDeleteDialog(anchorEl.id);
              }
            }}
            sx={{ color: "error.main" }}
          >
            <DeleteIcon sx={{ mr: 1 }} /> מחיקה
          </MenuItem>
        </Menu>

        <Dialog open={Boolean(deleteDialog)} onClose={() => setDeleteDialog(null)}>
          <DialogTitle>מחיקת מכתב?</DialogTitle>
          <DialogContent>
            <Typography>האם אתה בטוח שברצונך למחוק את המכתב הזה? פעולה זו לא ניתנת לביטול.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(null)}>ביטול</Button>
            <Button
              color="error"
              variant="contained"
              onClick={() => deleteDialog && handleDelete(deleteDialog)}
            >
              מחיקה
            </Button>
          </DialogActions>
        </Dialog>

        {feedbackDialog ? (
          <FeedbackDialog
            open={Boolean(feedbackDialog)}
            onClose={() => setFeedbackDialog(null)}
            onSubmit={(feedback, note) => {
              if (feedbackDialog) {
                updateLetterFeedback(feedbackDialog, feedback, note);
                if (feedback === "response-received") {
                  updateLetterStatus(feedbackDialog, "response-received");
                } else if (feedback === "no-response") {
                  updateLetterStatus(feedbackDialog, "waiting-response");
                }
              }
            }}
            letterSubject={letters.find((l) => l.id === feedbackDialog)?.subject || ""}
          />
        ) : null}
      </Stack>
    </Container>
  );
}
