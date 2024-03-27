import { Skeleton, Stack } from '@mui/material';

type StackProps = {
  variant?: 'vertical' | 'horizontal';
};
export function NoteDetailsSkeleton({ ...other }: StackProps) {
  return (
    <Stack {...other}>
      <Skeleton variant="rectangular" sx={{ height: 480 }} />

      <Stack sx={{ width: 1, maxWidth: 720, mx: 'auto' }}>
        <Stack spacing={1} sx={{ my: 8 }}>
          <Skeleton height={10} />
          <Skeleton height={10} sx={{ width: 0.9 }} />
          <Skeleton height={10} sx={{ width: 0.8 }} />
        </Stack>

        <Skeleton sx={{ height: 720 }} />
      </Stack>
    </Stack>
  );
}
