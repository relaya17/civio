import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Button, Container, Stack, Typography, Card, CardContent } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

interface Props {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error Boundary component to catch and display React errors gracefully
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} onReset={() => this.setState({ hasError: false, error: null, errorInfo: null })} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  readonly error: Error | null;
  readonly onReset: () => void;
}

function ErrorFallback({ error, onReset }: ErrorFallbackProps) {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Card variant="outlined" sx={{ textAlign: "center" }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3} sx={{ alignItems: "center" }}>
            <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main" }} />
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              אופס, משהו השתבש
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 500 }}>
              אנחנו מתנצלים על אי הנוחות. שגיאה התרחשה בטעינת הדף. אפשר לנסות לרענן או לחזור לדף הבית.
            </Typography>

            {error && import.meta.env.DEV ? (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: "error.light",
                  borderRadius: 1,
                  textAlign: "right",
                  maxWidth: "100%",
                  overflow: "auto",
                }}
              >
                <Typography variant="caption" sx={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }}>
                  {error.toString()}
                  {error.stack ? `\n\n${error.stack}` : ""}
                </Typography>
              </Box>
            ) : null}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center", mt: 2 }}>
              <Button variant="contained" startIcon={<RefreshIcon />} onClick={onReset}>
                נסה שוב
              </Button>
              <Button variant="outlined" startIcon={<HomeIcon />} onClick={() => navigate("/")}>
                חזור לדף הבית
              </Button>
            </Stack>

            <Typography variant="caption" sx={{ color: "text.secondary", mt: 2 }}>
              אם הבעיה נמשכת, אנא צרי קשר עם התמיכה
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}
