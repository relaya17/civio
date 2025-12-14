import { useMemo, useState } from "react";
import { Box, Fab, List, ListItemButton, ListItemText, Paper } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useFeatureFlagsStore } from "../../state/featureFlagsStore";

export function FloatingActions() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const lettersEnabled = useFeatureFlagsStore((s) => s.flags["letters.enabled"]);

  const items = useMemo(
    () => [
      {
        id: "wizard",
        label: "בדיקת זכות (שאלון)",
        icon: <ChatIcon />,
        onClick: () => navigate("/w"),
      },
      {
        id: "lawyers",
        label: "עו\"ד/יועץ (פיילוט)",
        icon: <PersonSearchIcon />,
        onClick: () => navigate("/lawyers"),
      },
      {
        id: "letter",
        label: "יצירת מכתב",
        icon: <DescriptionIcon />,
        onClick: () => navigate("/letters"),
        hidden: !lettersEnabled,
      },
      {
        id: "accessibility",
        label: "נגישות (בקרוב)",
        icon: <AccessibilityNewIcon />,
        onClick: () => window.alert("בקרוב: כלי נגישות"),
      },
    ],
    [lettersEnabled, navigate],
  );

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 20,
        insetInlineStart: { xs: "auto", md: 20 },
        insetInlineEnd: { xs: 20, md: "auto" },
        zIndex: 1500,
        display: "grid",
        gap: 1,
        justifyItems: "end",
      }}
    >
      {open ? (
        <Paper elevation={10} sx={{ width: 260, overflow: "hidden" }} aria-label="תפריט מהיר">
          <List dense disablePadding>
            {items.filter((it) => !it.hidden).map((it) => (
              <ListItemButton
                key={it.id}
                onClick={() => {
                  setOpen(false);
                  it.onClick();
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {it.icon}
                  <ListItemText primary={it.label} />
                </Box>
              </ListItemButton>
            ))}
          </List>
        </Paper>
      ) : null}

      <Fab
        color="primary"
        aria-label={open ? "סגירת תפריט" : "פתיחת תפריט מהיר"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <CloseIcon /> : <ChatIcon />}
      </Fab>
    </Box>
  );
}


