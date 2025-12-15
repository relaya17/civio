import { Card, CardContent, Stack, Typography, Link, Box, Chip, Divider } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import LinkIcon from "@mui/icons-material/Link";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import GavelIcon from "@mui/icons-material/Gavel";
import type { LetterAuthorityId } from "@repo/types";
import { getAuthorityInfo } from "@repo/logic";

interface AuthorityInfoCardProps {
  readonly authorityId: LetterAuthorityId;
}

/**
 * Displays relevant information, links, tips, and laws for a specific authority
 */
export function AuthorityInfoCard({ authorityId }: AuthorityInfoCardProps) {
  const info = getAuthorityInfo(authorityId);

  return (
    <Card variant="outlined" sx={{ mt: 2 }}>
      <CardContent>
        <Stack spacing={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <InfoIcon sx={{ color: "primary.main" }} />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              מידע רלוונטי וזכויות
            </Typography>
          </Box>

          {/* Links */}
          {info.links.length > 0 ? (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <LinkIcon sx={{ fontSize: 20, color: "primary.main" }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  קישורים שימושיים
                </Typography>
              </Box>
              <Stack spacing={1}>
                {info.links.map((link, index) => (
                  <Box key={index}>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontWeight: 600,
                        textDecoration: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {link.title}
                    </Link>
                    {link.description ? (
                      <Typography variant="caption" sx={{ display: "block", color: "text.secondary", mt: 0.5 }}>
                        {link.description}
                      </Typography>
                    ) : null}
                  </Box>
                ))}
              </Stack>
            </Box>
          ) : null}

          <Divider />

          {/* Tips */}
          {info.tips.length > 0 ? (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <LightbulbIcon sx={{ fontSize: 20, color: "warning.main" }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  טיפים חשובים
                </Typography>
              </Box>
              <Stack spacing={1}>
                {info.tips.map((tip, index) => (
                  <Box key={index} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                    <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
                      • {tip}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          ) : null}

          <Divider />

          {/* Relevant Laws */}
          {info.relevantLaws.length > 0 ? (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                <GavelIcon sx={{ fontSize: 20, color: "primary.main" }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  חוקים רלוונטיים
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {info.relevantLaws.map((law, index) => (
                  <Chip key={index} label={law} size="small" variant="outlined" />
                ))}
              </Box>
            </Box>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}
