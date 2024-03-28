import { Box, Skeleton } from "@mui/material";

export default function TodoSkeleton() {
  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Skeleton sx={{ width: '85%' }} animation="wave" />
      <Skeleton sx={{ width: '65%' }} />
    </Box>
  );
}