import { Button, Card, IconButton, Table, TableBody, TableContainer, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IKpi } from '../../../../@types/Kpi';
import ConfirmDialog from '../../../../components/confirm-dialog';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from '../../../../components/table';
import { useLocales } from '../../../../locales';
import { deleteManykpis, deleteOnekpi, getKpis } from '../../../../redux/slices/kpis/actions';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import KpiTableRow from './KpiTableRow';
import KpiTableToolbar from './KpiTableToolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'label', label: 'Label', align: 'left' },
  { id: 'frontType', label: 'Frontend Type', align: 'left' },
  { id: 'backType', label: 'Backend Type', align: 'left' },
  { id: 'isRequired', label: 'Required', align: 'center' },
  { id: 'options', label: 'Options', align: 'left' },
  { id: 'createdAt', label: 'Created At', align: 'left' },
  { label: '', align: 'center' },
];

// ----------------------------------------------------------------------

export default function KpisTable() {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const [tableData, setTableData] = useState<IKpi[]>([]);
  const [filterName, setFilterName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  const { kpis } = useSelector((state: RootState) => state?.kpis);

  useEffect(() => {
    dispatch(getKpis({ page, limit: rowsPerPage, orderBy, order, filterName }));
  }, [dispatch, page, rowsPerPage, orderBy, order, filterName]);

  useEffect(() => {
    setTableData(kpis?.docs);
  }, [kpis]);

  const isFiltered = filterName !== '';

  const isNotFound = (!tableData.length && !!filterName) || !tableData.length;

  const handleViewRow = (row: IKpi) => {
    navigate(`${PATH_DASHBOARD.kpis.view}/${row._id}`, { state: { kpi: row } });
  };

  const handleEditRow = (row: IKpi) => {
    navigate(`${PATH_DASHBOARD.kpis.edit}/${row._id}`, { state: { kpi: row } });
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

  const handleDeleteRow = (id: string) => {
    dispatch(deleteOnekpi({ kpiId: id }))
      .unwrap()
      .then((res) => enqueueSnackbar(`${res?.message}`))
      .catch((err) => enqueueSnackbar(`${err?.message}`, { variant: 'error' }));
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    dispatch(deleteManykpis({ kpiIds: selectedRows }))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(`${translate(res?.message)}`);
        dispatch(getKpis({ page: 0, limit: rowsPerPage, orderBy, order, filterName }));
        setSelected([]);
      })
      .catch((err) => enqueueSnackbar(`${translate(err?.message)}`, { variant: 'error' }));
  };

  return (
    <>
      <Card>
        <KpiTableToolbar
          onResetFilter={handleResetFilter}
          isFiltered={isFiltered}
          filterName={filterName}
          onFilterName={handleFilterName}
          placeholder="Search by kpi Name..."
        />
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={dense}
            numSelected={selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                tableData.map((row) => row._id)
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
                    tableData.map((row) => row._id)
                  )
                }
              />

              <TableBody>
                {tableData?.map((row: IKpi) => (
                  <KpiTableRow
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
          count={kpis.meta.totalDocs || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          dense={dense}
          onChangeDense={onChangeDense}
        />
      </Card>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
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
