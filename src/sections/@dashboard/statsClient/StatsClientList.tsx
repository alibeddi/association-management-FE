import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Button,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Tooltip,
} from '@mui/material';
// routes


// sections
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from '../../../components/table';
import { useLocales } from '../../../locales';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import StatsClientRow from './StatsClientRow';
import StatsClientTableToolbar from './StatsClientToolbar';
import { useAuthContext } from '../../../auth/useAuthContext';
import { hasPermission } from '../Permissions/utils';
import { MethodCode, ModelCode } from '../../../@types/Permission';
import { deleteManykpis, deleteOnekpi, getKpis } from '../../../redux/slices/kpis/actions';
import { deleteStatsClient, getAllStatsClient } from '../../../redux/slices/statsClient/action';
import { IStatsClient } from '../../../@types/statsClient';


export default function StatsClientList() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createdAt', defaultOrder: 'desc' });
  const TABLE_HEAD = [
    { id: 'name', label: 'Forum name', align: 'left' },
    { id: 'kpis', label:'Question' , align:'left'},
    {label:'view',align:'center'}
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<IStatsClient[]>([]);
  const [filterName, setFilterName] = useState('');
  useEffect(() => {
    dispatch(getAllStatsClient({page, limit:rowsPerPage, orderBy, order, filterName}));
  }, [dispatch, page, rowsPerPage, orderBy, order, filterName]);
  const { statsClients } = useSelector((state: RootState) => state?.statsClient);
  useEffect(() => {
    setTableData(statsClients?.docs);
  }, [statsClients]);
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();


  const [openConfirm, setOpenConfirm] = useState(false);

 



  const isFiltered = filterName !== '';

  const isNotFound = (!tableData.length && !!filterName) || !tableData.length;

  const handleViewRow = (row: IStatsClient) => {
    navigate(`${PATH_DASHBOARD.statsClient.view}/${row._id}`, { state: { statsClient: row } });
  };

  const handleEditRow = (row: IStatsClient) => {
    navigate(`${PATH_DASHBOARD.statsClient.edit}/${row._id}`, { state: { statsClient: row } });
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  const handleOpenConfirm = (id?: string) => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteRow = async (id: string) => {
    await dispatch(deleteStatsClient({ id })).unwrap().then((res) => enqueueSnackbar(`${res.data.message}`)).catch(error=>enqueueSnackbar(`${error.data.message}`, { variant: 'error' }))
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    dispatch(deleteManykpis({ kpiIds: selectedRows })).then((res: any) => {
      if (res?.meta?.requestStatus === 'fulfilled') {
        enqueueSnackbar(`${translate(res?.payload.message)}`);
        dispatch(getKpis({ page: 0, limit: rowsPerPage, orderBy, order, filterName }));
      } else {
        enqueueSnackbar(`${translate(res?.error?.message)}`, { variant: 'error' });
      }
      setSelected([]);
    });
  };

  const { user } = useAuthContext();
  const userPermissions = user?.permissionGroup[0].permissions;

  // check current user permissions
  const isAllowedToEditStatClient = hasPermission(userPermissions, ModelCode.STAT_CLIENT, MethodCode.EDIT);
  const isAllowedToDeleteStatClient = hasPermission(userPermissions, ModelCode.STAT_CLIENT, MethodCode.DELETE);
  if(isAllowedToDeleteStatClient && isAllowedToEditStatClient){
    TABLE_HEAD.push()
    TABLE_HEAD.push({label:'edit',align:'center'},{label:'delete',align:'center'})
  }
   

  return (
    <>
      <Container maxWidth={false}>
        <Card>
          <StatsClientTableToolbar
            onResetFilter={handleResetFilter}
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            placeholder="Search by Stats Client Name..."
          />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData?.map((row) => row._id)
                )
              }
              action={
                <Tooltip title={`${translate('Delete')}`}>
                  <IconButton color="primary" onClick={() => handleOpenConfirm()}>
                    <Iconify icon="material-symbols:delete" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked: boolean) =>
                    onSelectAllRows(
                      checked,
                      tableData?.map((row) => row._id)
                    )
                  }
                />

                <TableBody>
                  {tableData?.map((row: IStatsClient) => (
                    <StatsClientRow
                      key={row._id}
                      row={row}
                      selected={selected.includes(row._id)}
                      onSelectRow={() => onSelectRow(row._id)}
                      onDeleteRow={() => {
                        handleDeleteRow(row._id);
                      }}
                      onEditRow={() => {
                        handleEditRow(row);
                      }}
                      onViewRow={() => {
                        handleViewRow(row);
                      }}
                    />
                  ))}

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={statsClients.meta.totalDocs || 0}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected?.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
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
