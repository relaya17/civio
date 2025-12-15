import { Box, Skeleton, Stack, Card, CardContent } from "@mui/material";

/**
 * Skeleton loader for letter cards
 */
export function LetterCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={2}>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="text" width="80%" height={20} />
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="70%" height={20} />
        </Stack>
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton loader for statistics cards
 */
export function StatCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton variant="text" width="40%" height={48} />
        <Skeleton variant="text" width="60%" height={24} />
      </CardContent>
    </Card>
  );
}

/**
 * Skeleton loader for page content
 */
export function PageSkeleton() {
  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Skeleton variant="text" width="50%" height={48} />
        <Skeleton variant="rectangular" width="100%" height={200} />
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="60%" height={24} />
      </Stack>
    </Box>
  );
}

/**
 * Skeleton loader for letter form
 */
export function LetterFormSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="text" width="40%" height={32} />
      <Skeleton variant="rectangular" width="100%" height={56} />
      <Skeleton variant="rectangular" width="100%" height={56} />
      <Skeleton variant="rectangular" width="100%" height={120} />
      <Skeleton variant="rectangular" width="100%" height={120} />
      <Skeleton variant="rectangular" width="30%" height={40} />
    </Stack>
  );
}
