import { Avatar, Skeleton, Stack, TableCell, TableRow, Typography } from '@mui/material';
// ----------------------------------------------------------------------

type Props = {
  avatarIndex?: number;
  fields: number;
  height: number;
};

export default function LoadingTableRow({ avatarIndex, fields, height }: Props) {
  return (
    <TableRow
      sx={{
        ...(height && {
          height,
        }),
      }}
    >
      {[...new Array(fields || 5)].map((_, index: number) => {
        if (avatarIndex && avatarIndex === index) {
          return (
            <TableCell key={index}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
              </Stack>
            </TableCell>
          );
        }
        return (
          <TableCell key={index} align="left" sx={{ textTransform: 'capitalize' }}>
            <Skeleton width="100%">
              <Typography>.</Typography>
            </Skeleton>
          </TableCell>
        );
      })}
    </TableRow>
  );
}
