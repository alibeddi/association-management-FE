import { useState } from 'react';
import { useNavigate } from 'react-router';
// @mui
import {
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
// @types
import { User } from '../../../@types/User';
// components
import { MethodCode, ModelCode } from '../../../@types/Permission';
import { useAuthContext } from '../../../auth/useAuthContext';
import ConfirmDialog from '../../../components/confirm-dialog';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { fDate } from '../../../utils/formatTime';
import { findPermission } from '../Permissions/utils';

// ----------------------------------------------------------------------

type Props = {
  row: User;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const { name, email, office, createdAt, _id: userId } = row;
  const { user } = useAuthContext();
  const hasPermissionViewUser = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.USER,
    MethodCode.VIEW
  );
  const hasPermissionEditUser = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.USER,
    MethodCode.EDIT
  );
  const hasPermissionDeleteUser = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.USER,
    MethodCode.DELETE
  );
  const navigate = useNavigate();

  const handleViewUser = () => navigate(`${PATH_DASHBOARD.operators.view}/${userId}`);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

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
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{email}</TableCell>
        <TableCell align="left">{office?.name}</TableCell>
        <TableCell align="left">{createdAt ? fDate(createdAt) : ''}</TableCell>
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
    {hasPermissionViewUser &&    <MenuItem
          onClick={() => {
            handleViewUser()
          }}
          sx={{ color: 'principal.main' }}
        >
          <Iconify icon="carbon:view-filled" />
          View
        </MenuItem>}


       {hasPermissionEditUser && <MenuItem
          onClick={() => {
            handleEditUser()
          }}
          sx={{ color: 'principal.main' }}
        >
          <Iconify icon="eva:edit-fill" />
          Edit
        </MenuItem>}

 {hasPermissionDeleteUser &&       <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete
        </MenuItem>}
        
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
