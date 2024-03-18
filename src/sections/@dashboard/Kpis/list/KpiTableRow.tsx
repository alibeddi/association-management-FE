import { useState } from 'react';
// @mui
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  MenuItem,
  TableCell,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
// components
import { IKpi } from '../../../../@types/Kpi';
import { MethodCode, ModelCode } from '../../../../@types/Permission';
import { useAuthContext } from '../../../../auth/useAuthContext';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import { findPermission } from '../../Permissions/utils';

type Props = {
  row: IKpi;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
};

export default function KpiTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
}: Props) {
  const { name, label, frontType, isRequired, choices, createdAt } = row;

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const { user } = useAuthContext();

  // check current user permissions
  const isAllowedToDeleteKpi = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.KPI,
    MethodCode.DELETE
  );
  const isAllowedToEditKpi = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.KPI,
    MethodCode.EDIT
  );
  const isAllowedToViewKpi = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.KPI,
    MethodCode.VIEW
  );

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
            {name}
          </Typography>
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
            {label}
          </Box>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {frontType}
        </TableCell>

        <TableCell align="center">
          <Box
            sx={{
              color: isRequired ? '#3EAB55' : 'red',
              bgcolor: isRequired ? '#AFE1AF' : 'pink',
              borderRadius: '6px',
              display: 'inline-block', // Make the box inline-block to fit content width
              padding: '1px 1rem', // Adjust padding as needed
            }}
          >
            {isRequired.toString()}
          </Box>
        </TableCell>
        <TableCell align="left">
          {choices && choices?.length > 0 ? (
            <Tooltip
              title={
                <>
                  {choices?.map((option: string, index: number) => (
                    <p key={index}>{option}</p>
                  ))}
                </>
              }
            >
              <Box
                sx={{
                  maxWidth: 100,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {choices?.join(', ')}
              </Box>
            </Tooltip>
          ) : (
            <Box>No options...</Box>
          )}
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
