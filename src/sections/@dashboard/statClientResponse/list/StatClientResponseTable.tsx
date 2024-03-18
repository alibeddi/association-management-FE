import {
  Button,
  Card,
  Divider,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StatClientResponse } from '../../../../@types/StatClientResponse';
import { IStatus } from '../../../../@types/status';
import ConfirmDialog from '../../../../components/confirm-dialog';
import FilterModal from '../../../../components/FilterModal';
import Iconify from '../../../../components/iconify';
import LoadingTable from '../../../../components/loadingTable/LoadingTable';
import Scrollbar from '../../../../components/scrollbar';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable
} from '../../../../components/table';
import { useLocales } from '../../../../locales';
import {
  deleteManyStatClientResponse,
  deleteStatClientResponse,
  getAllStatClientResponses,
  statsClientResponseFilter
} from '../../../../redux/slices/statClientResponse/actions';
import { setCurrentStatClientId } from '../../../../redux/slices/statsClient';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import StatClientResponseTableRow from './StatClientResponseTableRow';
import StatClientResponseTableToolbar from './StatClientResponseTableToolbar';

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
  const location = useLocation();
  const statsClientId = location.state?.statsClientId;

  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const [tableData, setTableData] = useState<StatClientResponse[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterStatClient, setFilterStatClient] = useState<string>();
  const [tableHead, setTableHead] = useState<
    {
      id?: string;
      label: string;
      align: string;
    }[]
  >([]);

  const { statClientResponses, status } = useSelector(
    (state: RootState) => state.statClientResponses
  );

  const { statsClients } = useSelector((state: RootState) => state.statsClient);
  const { filters } = useSelector((state: RootState) => state.statClientResponses);

  const { docs: statsClientsDocs } = statsClients;

  const denseHeight = dense ? 52 : 72;

  useEffect(() => {
    if (statsClientId) {
      setFilterStatClient(statsClientId);
    } else {
      setFilterStatClient(statsClientsDocs[0]?._id);
    }
  }, [statsClients, statsClientId]);

  useEffect(() => {
    const currentStatClient = statsClientsDocs.find(
      (statClient) => statClient._id === filterStatClient
    );
    if (currentStatClient) {
      const kpis = currentStatClient.kpis.map((kpi) => ({
        id: kpi._id,
        label: kpi.label,
        align: 'left',
      }));
      setTableHead([
        { id: 'admin', label: 'Admin', align: 'left' },
        { id: 'clientName', label: 'Client Name', align: 'left' },
        { id: 'clientContact', label: 'Client Contact', align: 'left' },
        { id: 'statClient', label: 'stat-Client', align: 'left' },
        ...kpis,
        { id: 'createdAt', label: 'Created At', align: 'left' },
        { label: '', align: 'center' },
      ]);
    }
  }, [filterStatClient, statsClients]);

  useEffect(() => {
    if (filterStatClient) {
      if (filters.length > 0) {
        dispatch(
          statsClientResponseFilter({
            page: page + 1,
            limit: rowsPerPage,
            filterValue: filters,
            filterStatClient,
          })
        );
      } else {
        dispatch(
          getAllStatClientResponses({
            page,
            limit: rowsPerPage,
            orderBy,
            order,
            filterStatClient,
          })
        );
      }
    }
  }, [page, rowsPerPage, orderBy, order, filterStatClient, filters]);

  useEffect(() => {
    setTableData(statClientResponses?.docs);
  }, [statClientResponses]);

  useEffect(() => {
    dispatch(setCurrentStatClientId(filterStatClient));
  }, [filterStatClient]);

  const isNotFound = status === IStatus.SUCCEEDED && !tableData.length;

  const handleChangeTabs = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatClient(newValue);
  };

  const handleViewRow = (row: StatClientResponse) => {
    navigate(`${PATH_DASHBOARD.statClientResponse.view}/${row._id}`);
  };

  const handleEditRow = (row: StatClientResponse) => {
    navigate(`${PATH_DASHBOARD.statClientResponse.edit}/${row._id}`);
  };

  const handleOpenConfirm = (id?: string) => {
    setOpenConfirm(true);
  };
  const handleClosefFilter = () => {
    setOpenFilter(false);
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteRow = (id: string) => {
    dispatch(deleteStatClientResponse({ statClientResponseId: id }))
      .unwrap()
      .then((res) => enqueueSnackbar(`${translate(res.message)}`))
      .catch((err) => enqueueSnackbar(`${translate(err.message)}`, { variant: 'error' }));
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    dispatch(deleteManyStatClientResponse({ statClientResponses: selectedRows }))
      .unwrap()
      .then((res) => {
        enqueueSnackbar(`${translate(res.message)}`);
        dispatch(
          getAllStatClientResponses({
            page,
            limit: rowsPerPage,
            orderBy,
            order,
          })
        );
        setSelected([]);
      })
      .catch((err) => enqueueSnackbar(`${translate(err.message)}`, { variant: 'error' }));
  };

  return (
    <>
      <Card>
        <StatClientResponseTableToolbar />
        <Tabs
          value={filterStatClient}
          onChange={handleChangeTabs}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
          variant="scrollable"
          scrollButtons
          aria-label="scrollable auto tabs example"
        >
          {statsClientsDocs.map((tab) => (
            <Tab key={tab._id} label={tab.name} value={tab._id} />
          ))}
        </Tabs>
        <Divider />
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
                headLabel={tableHead}
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
                {status === IStatus.LOADING ? (
                  <LoadingTable
                    height={denseHeight}
                    fields={tableHead.length}
                    rowsPerPage={rowsPerPage}
                  />
                ) : (
                  tableData?.map((row: StatClientResponse) => (
                    <>
                      <StatClientResponseTableRow
                        filterStatClient={filterStatClient}
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
                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                      />
                    </>
                  ))
                )}

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
      <FilterModal open={openFilter} onClose={handleClosefFilter} />
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
