import { Box, Container, Link, Stack, Typography } from "@mui/material";
import { TrustBadges } from "../../components/TrustBadges";
import { Link as RouterLink } from "react-router-dom";

export function Footer() {
  return (
    <>
      <TrustBadges />
      <Box
        component="footer"
        sx={{
          borderTop: "1px solid",
          borderColor: "rgba(255,255,255,0.14)",
          backgroundColor: "primary.dark",
          color: "common.white",
          py: { xs: 1.25, sm: 2 },
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction="column"
            spacing={0.75}
            sx={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}
          >
            <Stack direction="row" spacing={1.25} sx={{ alignItems: "baseline", justifyContent: "center", flexWrap: "wrap" }}>
              <Typography sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}>מגדלור</Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.8, display: { xs: "none", sm: "inline" } }}>
                מידע כללי בלבד · לא ייעוץ משפטי · מומלץ להיוועץ באנשי מקצוע מתאימים
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ alignItems: "center", justifyContent: "center" }}>
              <Link component={RouterLink} to="/" underline="hover" sx={{ fontWeight: 800, fontSize: 13, color: "rgba(255,255,255,0.94)" }}>
                בית
              </Link>
              <Typography sx={{ opacity: 0.35, fontSize: 13 }}>•</Typography>
              <Link component={RouterLink} to="/rights" underline="hover" sx={{ fontWeight: 800, fontSize: 13, color: "rgba(255,255,255,0.94)" }}>
                זכויות
              </Link>
              <Typography sx={{ opacity: 0.35, fontSize: 13 }}>•</Typography>
              <Link component={RouterLink} to="/letters" underline="hover" sx={{ fontWeight: 800, fontSize: 13, color: "rgba(255,255,255,0.94)" }}>
                מכתבים
              </Link>
              <Typography sx={{ opacity: 0.35, fontSize: 13 }}>•</Typography>
              <Link component={RouterLink} to="/terms" underline="hover" sx={{ fontWeight: 800, fontSize: 13, color: "rgba(255,255,255,0.94)" }}>
                תנאי שימוש ופרטיות
              </Link>
              <Typography sx={{ opacity: 0.35, fontSize: 13 }}>•</Typography>
              <Typography variant="caption" sx={{ opacity: 0.82, whiteSpace: "nowrap" }}>
                © {new Date().getFullYear()} · כל הזכויות שמורות ל‑Relaya
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
}


