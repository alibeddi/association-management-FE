import { Card, Table, TableBody, TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Office } from '../../../../@types/offices';
import Scrollbar from '../../../../components/scrollbar';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from '../../../../components/table';
import { getAllOffices } from '../../../../redux/slices/offices/actions';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import OfficesTableToolbar from './OfficesTableToolbar';
import OfficeTableRow from './OfficeTableRow';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'address', label: 'address', align: 'left' },
  { id: 'createdAt', label: 'Created At', align: 'left' },
];
export default function OfficesTable() {
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

  const { offices } = useSelector((state: RootState) => state.offices);

  const [tableData, setTableData] = useState<Office[]>([]);
  const [search, setSearch] = useState('');

  const isFiltered = search !== '';
  const isNotFound = (!tableData.length && !!search) || !tableData.length;

  useEffect(() => {
    dispatch(getAllOffices({ page, limit: rowsPerPage, orderBy, order, search }));
  }, [dispatch, page, rowsPerPage, orderBy, order, search]);

  useEffect(() => {
    setTableData(offices?.docs);
  }, [offices]);

  const handleResetFilter = () => {
    setSearch('');
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setSearch(event.target.value);
  };

  return (
    <Card>
      <OfficesTableToolbar
        onResetFilter={handleResetFilter}
        isFiltered={isFiltered}
        search={search}
        onSearch={handleSearch}
        placeholder="Search by office Name, adress..."
      />
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={selected.length}
              onSort={onSort}
            />

            <TableBody>
              {tableData?.map((row: Office) => (
                <OfficeTableRow key={row._id} row={row} />
              ))}

              <TableNoData isNotFound={isNotFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={offices.meta.totalDocs || 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        dense={dense}
        onChangeDense={onChangeDense}
      />
    </Card>
  );
}
