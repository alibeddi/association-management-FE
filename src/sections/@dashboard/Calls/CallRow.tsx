import {
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';

import { ICall } from '../../../@types/Call';
import { fDate } from '../../../utils';

type Props = {
  row: ICall;
  selected: boolean;
};

export default function CallRow({
  row,
  selected,
}: Props) {
  const {
    user: userData,
    date,
    calls: { maked, received },
  } = row;
  return (
      <TableRow hover selected={selected}>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {userData?.name}
          </Typography>
        </TableCell>

        <TableCell align="left">{fDate(date)}</TableCell>
        <TableCell align="left">{maked}</TableCell>
        <TableCell align="left">{received}</TableCell>
      </TableRow>
  );
}
