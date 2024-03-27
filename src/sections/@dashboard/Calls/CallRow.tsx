import { useState } from 'react';
// @mui
import {
  Button,
  Checkbox,
  TableCell,
  TableRow,
  Typography,
  MenuItem,
  IconButton,
} from '@mui/material';

import MenuPopover from '../../../components/menu-popover';
import { useAuthContext } from '../../../auth/useAuthContext';
import ConfirmDialog from '../../../components/confirm-dialog';
import usePermission from '../../../hooks/usePermission';
import { ICall } from '../../../@types/Call';
import { fDate } from '../../../utils';
import Iconify from '../../../components/iconify';

type Props = {
  row: ICall;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
};

export default function CallRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const {
    user: userData,
    date,
    calls: { maked, received },
  } = row;
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const { user } = useAuthContext();
  const { isSuperAdmin, hasPermissionViewCall, hasPermissionUpdateCall, hasPermissionDeleteCall } =
    usePermission();

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {userData?.name}
          </Typography>
        </TableCell>

        <TableCell align="left">{fDate(date)}</TableCell>
        <TableCell align="left">{maked}</TableCell>
        <TableCell align="left">{received}</TableCell>
      </TableRow>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
