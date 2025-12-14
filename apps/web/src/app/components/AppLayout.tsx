import type { PropsWithChildren } from "react";
import { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TranslateIcon from "@mui/icons-material/Translate";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import { Footer } from "./Footer";

export function AppLayout({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const [langAnchor, setLangAnchor] = useState<HTMLElement | null>(null);
  const [mobileAnchor, setMobileAnchor] = useState<HTMLElement | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);

  const nav = useMemo(
    () => [
      { to: "/", label: "בית" },
      { to: "/rights", label: "זכויות" },
      { to: "/letters", label: "מכתבים" },
      { to: "/w/employee-termination", label: "שאלון" },
      { to: "/lawyers", label: "עו״ד/יועץ (פיילוט)" },
    ],
    [],
  );

  return (
    <Box sx={{ minHeight: "100dvh", display: "grid", gridTemplateRows: "auto 1fr auto" }}>
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{
          backgroundColor: "primary.dark",
          color: "common.white",
          borderBottom: "1px solid",
          borderColor: "rgba(255,255,255,0.14)",
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: 72 }}>
          <Container maxWidth="lg" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
            {/* Right side (RTL start): nav + actions */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
              {/* Desktop nav */}
              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5, alignItems: "center" }}>
                {nav.map((it) => {
                  const active = location.pathname === it.to;
                  return (
                    <Button
                      key={it.to}
                      component={RouterLink}
                      to={it.to}
                      color="inherit"
                      aria-current={active ? "page" : undefined}
                      sx={{
                        fontWeight: 700,
                        color: "common.white",
                        px: 1.25,
                        borderRadius: 999,
                        backgroundColor: active ? "rgba(255,255,255,0.16)" : "transparent",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.20)" },
                      }}
                      variant="text"
                    >
                      {it.label}
                    </Button>
                  );
                })}
              </Box>

              {/* Desktop actions */}
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 0.75 }}>
                <IconButton
                  aria-label="בינה מלאכותית"
                  onClick={() => navigate("/w/employee-termination")}
                  color="inherit"
                  sx={{ color: "common.white" }}
                >
                  <AutoAwesomeIcon />
                </IconButton>
                <Button
                  size="small"
                  variant="outlined"
                  endIcon={<TranslateIcon />}
                  onClick={(e) => setLangAnchor(e.currentTarget)}
                  sx={{
                    color: "common.white",
                    borderColor: "rgba(255,255,255,0.26)",
                    "&:hover": { borderColor: "rgba(255,255,255,0.40)", backgroundColor: "rgba(255,255,255,0.08)" },
                    borderRadius: 999,
                    px: 1.25,
                    fontWeight: 800,
                    minWidth: 0,
                  }}
                >
                  שפה
                </Button>
              </Box>

              {/* Mobile actions: hamburger at the edge, next to it AI + language */}
              <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 0.25 }}>
                <IconButton
                  aria-label="תפריט ניווט"
                  onClick={(e) => setMobileAnchor(e.currentTarget)}
                  color="inherit"
                  sx={{ color: "common.white" }}
                >
                  <MenuIcon />
                </IconButton>

                <IconButton
                  aria-label="בינה מלאכותית"
                  onClick={() => navigate("/w/employee-termination")}
                  color="inherit"
                  sx={{ color: "common.white" }}
                >
                  <AutoAwesomeIcon />
                </IconButton>

                <Button
                  size="small"
                  variant="outlined"
                  endIcon={<TranslateIcon />}
                  onClick={(e) => setLangAnchor(e.currentTarget)}
                  sx={{
                    color: "common.white",
                    borderColor: "rgba(255,255,255,0.26)",
                    "&:hover": { borderColor: "rgba(255,255,255,0.40)", backgroundColor: "rgba(255,255,255,0.08)" },
                    borderRadius: 999,
                    px: 1.0,
                    fontWeight: 800,
                    minWidth: 0,
                  }}
                >
                  שפה
                </Button>
              </Box>
            </Box>

            {/* Left side: Brand (force to left even in RTL) */}
            <Box
              component={RouterLink}
              to="/"
              sx={{
                textDecoration: "none",
                color: "common.white",
                display: "flex",
                alignItems: "center",
                gap: 1,
                minWidth: 0,
              }}
            >
              <Box
                component="img"
                src="/migdal.png"
                alt="לוגו מגדלור"
                sx={{ width: 28, height: 28, borderRadius: 1.5, display: "block" }}
              />
              <Typography sx={{ fontWeight: 900, letterSpacing: "-0.02em", fontSize: 20, lineHeight: 1 }}>
                מגדלור
              </Typography>
              <Typography sx={{ opacity: 0.9, fontSize: 13, display: { xs: "none", sm: "inline" } }}>
                אור ומדריך בדרך לזכויות
              </Typography>
            </Box>

            {/* Mobile menu */}
            <Menu
              anchorEl={mobileAnchor}
              open={Boolean(mobileAnchor)}
              onClose={() => setMobileAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              {nav.map((it) => (
                <MenuItem
                  key={it.to}
                  selected={location.pathname === it.to}
                  onClick={() => {
                    setMobileAnchor(null);
                    navigate(it.to);
                  }}
                >
                  {it.label}
                </MenuItem>
              ))}
            </Menu>

            {/* Language menu */}
            <Menu
              anchorEl={langAnchor}
              open={Boolean(langAnchor)}
              onClose={() => setLangAnchor(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  setLangAnchor(null);
                  setSnackOpen(true);
                }}
              >
                עברית (ברירת מחדל)
              </MenuItem>
              <MenuItem disabled>English (בקרוב)</MenuItem>
              <MenuItem disabled>العربية (בקרוב)</MenuItem>
              <MenuItem disabled>Русский (בקרוב)</MenuItem>
            </Menu>
          </Container>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ minWidth: 0 }}>
        {children}
      </Box>

      <Footer />

      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
        message="בקרוב: תמיכה בשפות נוספות"
      />
    </Box>
  );
}


