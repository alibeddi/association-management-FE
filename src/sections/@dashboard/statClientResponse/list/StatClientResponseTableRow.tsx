import {
  Box,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MethodCode, ModelCode } from '../../../../@types/Permission';
import { StatClientResponse } from '../../../../@types/StatClientResponse';
import { useAuthContext } from '../../../../auth/useAuthContext';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { fDate } from '../../../../utils/formatTime';
import { hasPermission } from '../../Permissions/utils';

type Props = {
  row: StatClientResponse;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
};

export default function StatClientResponseTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
}: Props) {
  const { admin, clientName, createdAt, _id } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const { user } = useAuthContext();
  const userPermissions = user?.permissionGroup[0].permissions;

  // check current user permissions
  const isAllowedToDeleteKpi = hasPermission(userPermissions, ModelCode.KPI, MethodCode.DELETE);
  const isAllowedToEditKpi = hasPermission(userPermissions, ModelCode.KPI, MethodCode.EDIT);
  const isAllowedToViewKpi = hasPermission(userPermissions, ModelCode.KPI, MethodCode.VIEW);

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

        <TableCell align="left">
          <Box
            sx={{
              maxWidth: 125,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {admin.name}
          </Box>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {clientName}
          </Typography>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          <Link to={`${PATH_DASHBOARD.statClientResponse.edit}/${_id}`}>
            click here to see the answers
          </Link>
        </TableCell>

        <TableCell align="left">{fDate(createdAt)}</TableCell>
        <TableCell align="right">
          <IconButton color={openPopover ? 'inherit' : 'default'} onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        {isAllowedToDeleteKpi && (
          <MenuItem
            onClick={() => {
              handleOpenConfirm();
              handleClosePopover();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>
        )}

        {isAllowedToEditKpi && (
          <MenuItem
            onClick={() => {
              onEditRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        )}
        {isAllowedToViewKpi && (
          <MenuItem
            onClick={() => {
              onViewRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="carbon:view-filled" />
            View
          </MenuItem>
        )}
      </MenuPopover>

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
