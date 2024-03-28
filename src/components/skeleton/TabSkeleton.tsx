import { Skeleton } from '@mui/material';

export default function TabSkeleton() {
  return <Skeleton animation="wave" width={75} height={25} sx={{ bgcolor: 'white' }} />;
}
