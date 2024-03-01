import { useState } from 'react';
// @mui
import {
  Box,
  Button,
  Checkbox, TableCell,
  TableRow, Tooltip, Typography
} from '@mui/material';
// utils
// components
import { IKpi } from '../../../@types/Kpi';
import { MethodCode, ModelCode } from '../../../@types/Permission';
import { IStatsClient } from '../../../@types/statsClient';
import { useAuthContext } from '../../../auth/useAuthContext';
import ConfirmDialog from '../../../components/confirm-dialog';
import Iconify from '../../../components/iconify';
import { hasPermission } from '../Permissions/utils';

type Props = {
  row: IStatsClient;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
  onCreateRowResponse: VoidFunction;
};

export default function StatsClientRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
  onCreateRowResponse,
}: Props) {
  const { name, kpis } = row;
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const { user } = useAuthContext();
  const userPermissions = user?.permissionGroup[0].permissions;

  // check current user permissions
  const isAllowedToDeleteStatClient = hasPermission(
    userPermissions,
    ModelCode.STAT_CLIENT,
    MethodCode.DELETE
  );
  const isAllowedToEditStatClient = hasPermission(
    userPermissions,
    ModelCode.STAT_CLIENT,
    MethodCode.EDIT
  );
  const isAllowedToViewStatClient = hasPermission(
    userPermissions,
    ModelCode.STAT_CLIENT,
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
        <TableCell>
          <Typography
            variant="subtitle2"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '.5rem',
            }}
          >
            <Tooltip 
            
            title={
              <>
              {
                kpis?.map((kpi:IKpi,index)=>
                  <p key={index}>{kpi.label}</p>
                )
              }
              </>
            }>
              <Box
               sx={{
                maxWidth: 100,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              >
              {
                kpis.map((kpi:IKpi)=> `${kpi.label} ,` ).join('').slice(0,-1)
              }
              </Box>

            </Tooltip>
            
          </Typography>
        </TableCell>
        <TableCell
          align="center"
          onClick={() => {
            onCreateRowResponse();
          }}
        >
          <Iconify icon="ion:create" />
        </TableCell>
        {isAllowedToViewStatClient && (
          <TableCell
            align="center"
            onClick={() => {
              onViewRow();
              handleClosePopover();
            }}
          >
            <Iconify icon="carbon:view-filled" />
          </TableCell>
        )}
        {isAllowedToEditStatClient && (
          <TableCell align="center" onClick={() => onEditRow()}>
            <Iconify icon="eva:edit-fill" />
          </TableCell>
        )}
        {isAllowedToDeleteStatClient && (
          <TableCell align="center" onClick={() => onDeleteRow()}>
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
