import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Tab,
  Table,
  TableBody,
  TableContainer,
  Tabs,
  Tooltip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import UserTableToolbar from './userTableToolbar';
import UserTableRow from './userTableRow';
import {
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from '../../../components/table';
import { _userList } from '../../../_mock/arrays';
import { PATH_DASHBOARD } from '../../../routes/paths';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import { IUserAccountGeneral } from '../../../@types/User';
import { RootState } from '../../../redux/store';
import { getUsers } from '../../../redux/slices/users/actions';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = ['all'];

const ROLE_OPTIONS = [
  'all',
  'ux designer',
  'full stack designer',
  'backend developer',
  'project manager',
  'leader',
  'ui designer',
  'ui/ux designer',
  'front end developer',
  'full stack developer',
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'office', label: 'Office', align: 'left' },
  { id: 'createdAt', label: 'createdAt', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'right' },
  // { id: '' },
];

// ----------------------------------------------------------------------

export default function UserListPage() {
  const { users } = useSelector((state: RootState) => state.users);
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
  } = useTable();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers({ page, limit: rowsPerPage }));
  }, [page, rowsPerPage, dispatch]);

  const [tableData, setTableData] = useState(users?.docs);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState('all');

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const dataFiltered = tableData;

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== 'all' || filterStatus !== 'all';

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => row._id !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selectedRows: string[]) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row._id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };
  const handleEditRow = (id: string) => {
    navigate(PATH_DASHBOARD.operators);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole('all');
    setFilterStatus('all');
  };

  useEffect(() => {
    setTableData(users?.docs);
  }, [users]);
  console.log({ page, rowsPerPage, tableData });
  console.log({ tableData });
  return (
    <>
      <CustomBreadcrumbs
        heading="User List"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'User', href: PATH_DASHBOARD.operators },
          { name: 'List' },
        ]}
        // action={
        //   <Button
        //     component={RouterLink}
        //     to={PATH_DASHBOARD.operators}
        //     variant="contained"
        //     startIcon={<Iconify icon="eva:plus-fill" />}
        //   >
        //     New User
        //   </Button>
        // }
      />

      <Card>
        {/* <Tabs
          value={filterStatus}
          onChange={handleFilterStatus}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab key={tab} label={tab} value={tab} />
          ))}
        </Tabs>

        <Divider />

        <UserTableToolbar
          isFiltered={isFiltered}
          filterName={filterName}
          filterRole={filterRole}
          optionsRole={ROLE_OPTIONS}
          onFilterName={handleFilterName}
          onFilterRole={handleFilterRole}
          onResetFilter={handleResetFilter}
        /> */}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={dense}
            numSelected={selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked: any) =>
              onSelectAllRows(
                checked,
                tableData.map((row) => row._id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={handleOpenConfirm}>
                  <Iconify icon="eva:trash-2-outline" />
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
                onSelectAllRows={(checked: any) =>
                  onSelectAllRows(
                    checked,
                    tableData.map((row) => row._id)
                  )
                }
              />

              <TableBody>
                {tableData.map((row) => (
                  <UserTableRow
                    key={row._id}
                    row={row}
                    selected={selected.includes(row._id)}
                    onSelectRow={() => onSelectRow(row._id)}
                    onDeleteRow={() => handleDeleteRow(row._id)}
                    onEditRow={() => handleEditRow(row.firstName)}
                  />
                ))}

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={users.meta.totalDocs || 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          //
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
