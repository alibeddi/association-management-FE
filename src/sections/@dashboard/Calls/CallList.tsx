import { Card, TableBody, Table, TableContainer } from '@mui/material';
import { Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { IStatus } from '../../../@types/status';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from '../../../components/table';
import { TABLE_HEAD } from '../../../constant/table_head';
import Scrollbar from '../../../components/scrollbar';
import LoadingTable from '../../../components/loadingTable/LoadingTable';
import { ICall } from '../../../@types/Call';
import { dispatch, useSelector } from '../../../redux/store';
import { getAllCall } from '../../../redux/slices/calls/actions';
import CallRow from './CallRow';
import CallToolbar from './CallToolbar';
import { useDateRangePicker } from '../../../components/date-range-picker';

const CallList = () => {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    selected,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createdAt', defaultOrder: 'desc' });
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onChangeStartDate,
    onChangeEndDate,
    open: openPicker,
    onOpen: onOpenPicker,
    onClose: onClosePicker,
    onReset: onResetPicker,
    isSelected: isSelectedValuePicker,
    isError,
    shortLabel,
  } = useDateRangePicker(null, null);
  const [filterName, setFilterName] = useState('');
  const denseHeight = dense ? 52 : 72;
  useEffect(() => {
    dispatch(
      getAllCall({ page, limit: rowsPerPage, orderBy, order, filterName, startDate, endDate })
    );
  }, [dispatch, page, rowsPerPage, orderBy, order, filterName, startDate, endDate]);
  const { calls, status } = useSelector((store) => store.calls);
  const [tableData, setTableData] = useState<ICall[]>(calls?.docs);
  const isNotFound = tableData.length === 0;
  const handleResetFilter = () => {
    setPage(0);
    if (setStartDate && setEndDate) {
      setStartDate(null);
      setEndDate(null);
    }
  };
  useEffect(() => {
    setTableData(calls.docs);
  }, [calls]);
  return (
    <>
      <Container maxWidth={false}>
        <Card>
          <CallToolbar
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
            open={openPicker}
            onOpen={onOpenPicker}
            onClose={onClosePicker}
            onReset={onResetPicker}
            isSelected={isSelectedValuePicker}
            isError={isError}
            shortLabel={shortLabel}
            resetFilter={handleResetFilter}
          />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData?.map((row) => row._id || nanoid())
                )
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD.calls}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {status === IStatus.LOADING ? (
                    <LoadingTable
                      height={denseHeight}
                      fields={TABLE_HEAD.calls.length}
                      rowsPerPage={rowsPerPage}
                    />
                  ) : (
                    tableData?.map((row: ICall) => {
                      const rowId = row._id || nanoid();
                      return <CallRow key={rowId} row={row} selected={selected.includes(rowId)} />;
                    })
                  )}

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={calls?.meta?.totalDocs || 0}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
};

export default CallList;
