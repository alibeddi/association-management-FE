import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Card,
  Table,
  Button,
  TableBody,
  Container,
  TableContainer,
  Tooltip,
  IconButton,
} from '@mui/material';
// routes

// types
import { IKpi } from '../../../../@types/Kpi';
// components

// sections
import { PricingGroupTableToolbar } from '../../sections/pricingGroups/list';
import KpiTableRow from './KpiTableRow';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { useLocales } from '../../../../locales';
import { getKpis } from '../../../../redux/slices/kpis';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import {
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from '../../../../components/table';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import ConfirmDialog from '../../../../components/confirm-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'customer.firstName', label: 'Name', align: 'left' },
  { id: 'customer.idCardNumber', label: 'ID Card', align: 'center' },
  { id: 'customer.passportNumber', label: 'Passport', align: 'center' },
  {
    id: 'customer.drivingLicenseNumber',
    label: 'Driving License',
    align: 'center',
  },
  { id: 'customer.phone', label: 'Phone', align: 'center' },
  { id: 'customer.nationality', label: 'Nationality', align: 'center' },
  { id: 'customer.createdAt', label: 'Created At', align: 'center' },
  { label: '', align: 'center' },
];

// ----------------------------------------------------------------------

export default function CustomerListPage() {
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
  } = useTable({ defaultOrderBy: 'customer.createdAt', defaultOrder: 'desc' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const [tableData, setTableData] = useState<IKpi[]>([]);
  const [filterName, setFilterName] = useState('');
  const [openConfirm, setOpenConfirm] = useState(false);
  const [banMany, setBanMany] = useState(true);
  const [rowId, setRowId] = useState('');

  const { kpis } = useSelector((state: RootState) => state?.kpis);

  useEffect(() => {
    dispatch(
      getKpis({ page, limit: rowsPerPage, sortBy: orderBy, sort: order, filter: filterName })
    );
  }, [dispatch, page, rowsPerPage, orderBy, order, filterName]);

  useEffect(() => {
    setTableData(kpis.docs);
  }, [kpis.docs]);

  const isFiltered = filterName !== '';

  const isNotFound = (!tableData.length && !!filterName) || !tableData.length;

  const handleViewRow = (row: any) => {
    navigate(PATH_DASHBOARD.settings.kpiView);
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
    if (id) {
      setRowId(id);
      setBanMany(false);
    } else {
      setBanMany(true);
    }
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Helmet>
        <title>{`${translate('Customers')}`}</title>
      </Helmet>

      <Container maxWidth={false}>
        <CustomBreadcrumbs heading="kpis" links={[{ name: 'kpis' }]} />
        <Card>
          <PricingGroupTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
            placeholder={`${translate('Search by Name, ID Card, Phone or Driving License...')}`}
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
                <Tooltip title={`${translate('Ban')}`}>
                  <IconButton color="primary" onClick={() => handleOpenConfirm()}>
                    <Iconify icon="ion:ban" />
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
                  {tableData?.map((row: any) => (
                    <KpiTableRow
                      key={row.customer.id}
                      row={row}
                      selected={selected.includes(row.customer.id)}
                      onViewRow={() => handleViewRow(row.customer)}
                      onSelectRow={() => onSelectRow(row.customer.id)}
                      // handleOpenConfirm={() => handleOpenConfirm(row.customer.id)}
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
      </Container>

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
              // handleDeleteRows(selected);
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
