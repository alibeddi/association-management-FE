import { Button, Card, IconButton, Table, TableBody, TableContainer, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StatClientResponse } from '../../../../@types/StatClientResponse';
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
import {
  deleteStatClientResponse,
  getAllStatClientResponses,
} from '../../../../redux/slices/statClientResponse/actions';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import StatClientResponseTableRow from './StatClientResponseTableRow';
import StatClientResponseTableToolbar from './StatClientResponseTableToolbar';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'admin', label: 'Admin', align: 'left' },
  { id: 'clientName', label: 'Client Name', align: 'left' },
  { id: 'clientContact', label: 'Client Contact', align: 'left' },
  { id: 'statClient', label: 'stat-Client', align: 'left' },
  { id: 'kpis', label: 'Kpis', align: 'left' },
  { id: 'createdAt', label: 'Created At', align: 'left' },
  { label: '', align: 'center' },
];

// ----------------------------------------------------------------------

export default function StatClientResponsesTable() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
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

  const [tableData, setTableData] = useState<StatClientResponse[]>([]);
  const [filterClientName, setFilterClientName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);

  const { statClientResponses } = useSelector((state: RootState) => state.statClientResponses);

  useEffect(() => {
    dispatch(
      getAllStatClientResponses({ page, limit: rowsPerPage, orderBy, order, filterClientName })
    );
  }, [dispatch, page, rowsPerPage, orderBy, order, filterClientName]);

  useEffect(() => {
    setTableData(statClientResponses?.docs);
  }, [statClientResponses]);

  const isFiltered = filterClientName !== '';

  const isNotFound = (!tableData.length && !!filterClientName) || !tableData.length;

  const handleViewRow = (row: StatClientResponse) => {
    navigate(`${PATH_DASHBOARD.statClientResponse.view}/${row._id}`);
  };

  const handleEditRow = (row: StatClientResponse) => {
    navigate(`${PATH_DASHBOARD.statClientResponse.edit}/${row._id}`);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterClientName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterClientName('');
  };

  const handleOpenConfirm = (id?: string) => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteRow = (id: string) => {
    dispatch(deleteStatClientResponse({ statClientResponseId: id })).then((res: any) => {
      if (res?.meta?.requestStatus === 'fulfilled') {
        enqueueSnackbar(`${res?.payload.message}`);
      } else {
        enqueueSnackbar(`${res?.error?.message}`, { variant: 'error' });
      }
    });
  };

  const handleDeleteRows = (selectedRows: string[]) => {};

  return (
    <>
      <Card>
        <StatClientResponseTableToolbar
          onResetFilter={handleResetFilter}
          isFiltered={isFiltered}
          filterClientName={filterClientName}
          onFilterName={handleFilterName}
          placeholder="Search by Client Name..."
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
                {tableData?.map((row: StatClientResponse) => (
                  <StatClientResponseTableRow
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
          count={statClientResponses.meta.totalDocs || 0}
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
