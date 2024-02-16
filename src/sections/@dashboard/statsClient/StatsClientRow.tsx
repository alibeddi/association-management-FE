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
  Typography,
} from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import { IKpi } from '../../../@types/Kpi';
import ConfirmDialog from '../../../components/confirm-dialog';
import Iconify from '../../../components/iconify';
import MenuPopover from '../../../components/menu-popover';
import { hasPermission } from '../Permissions/utils';
import { MethodCode, ModelCode } from '../../../@types/Permission';
import { useAuthContext } from '../../../auth/useAuthContext';
import { IStatsClient } from '../../../@types/statsClient';

type Props = {
  row: IStatsClient;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
};

export default function StatsClientRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
}: Props) {
  const { name,kpis } = row;
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const { user } = useAuthContext();
  const userPermissions = user?.permissionGroup[0].permissions;
  
  // check current user permissions
  const isAllowedToDeleteStatClient = hasPermission(userPermissions,ModelCode.STAT_CLIENT,MethodCode.DELETE);
  const isAllowedToEditStatClient = hasPermission(userPermissions,ModelCode.STAT_CLIENT,MethodCode.EDIT);
  const isAllowedToViewStatClient = hasPermission(userPermissions,ModelCode.STAT_CLIENT,MethodCode.VIEW);

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
        <TableCell>
  <Typography variant="subtitle2" sx={{
    display:'flex',
    flexDirection:'column',
    gap:'.5rem'
  }}>
    {kpis?.map((kpi: IKpi) => (
      <Box key={kpi._id}>{kpi.label}</Box>
    ))}
    
  </Typography>
</TableCell>

          <TableCell
          align='center'
            onClick={() => {
              onViewRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="carbon:view-filled" />
            </TableCell>

        {isAllowedToEditStatClient && (
          <TableCell
          align='center'
            onClick={() => onEditRow()}
          >
            <Iconify icon="eva:edit-fill" />
            </TableCell>
        )}
          {isAllowedToDeleteStatClient && (
          <TableCell
          align='center'
            onClick={() => onDeleteRow()}
          >
            <Iconify icon="eva:trash-2-outline" />
            </TableCell>
        )}    
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
