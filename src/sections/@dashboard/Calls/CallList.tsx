import { Translate } from '@mui/icons-material';
import { Card, IconButton, TableBody,Table, TableContainer, Tooltip, Button } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit';
import { IStatus } from '../../../@types/status';
import Iconify from '../../../components/iconify';
import { TableHeadCustom, TableNoData, TablePaginationCustom, TableSelectedAction, useTable } from '../../../components/table';
import { TABLE_HEAD } from '../../../constant/table_head';
import { useLocales } from '../../../locales';
import Scrollbar from '../../../components/scrollbar';
import LoadingTable from '../../../components/loadingTable/LoadingTable';
import {ICall} from "../../../@types/Call"
import ConfirmDialog from '../../../components/confirm-dialog';
import { dispatch, useSelector } from '../../../redux/store';
import { getAllCall } from '../../../redux/slices/calls/actions';
import CallRow from './CallRow';


const CallList = () => {
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
  const [filterName, setFilterName] = useState('');
  const { translate } = useLocales();
  const denseHeight = dense ? 52 : 72;
  const handleOpenConfirm = () => {}
  const handleDeleteRow = (id:string) =>{}
  const handleEditRow = (id:string) => {}
  const openConfirm = false;
  const handleDeleteRows =(data:any) => console.log(data);
  const handleCloseConfirm = () =>{};
  const handleView = (data:ICall) => console.log(data)
  useEffect(()=>{
    dispatch(getAllCall({page, limit: rowsPerPage, orderBy, order, filterName }))
  },[dispatch,page,rowsPerPage, orderBy, order, filterName])
  const {calls,status} = useSelector(store=>store.calls)
  const [tableData, setTableData] = useState<ICall[]>(calls?.docs);
  const isNotFound =  tableData.length === 0;
  useEffect(()=>{
    setTableData(calls.docs)
  },[calls])
  return (
    <>
    <Container maxWidth={false}>
      <Card>
        {/* <StatsClientTableToolbar
          onResetFilter={handleResetFilter}
          isFiltered={isFiltered}
          filterName={filterName}
          onFilterName={handleFilterName}
          placeholder="Search by Stats Client Name..."
        /> */}
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
                headLabel={TABLE_HEAD.calls}
                rowCount={tableData.length}
                numSelected={selected.length}
                onSort={onSort}
                onSelectAllRows={(checked: boolean) =>
                  onSelectAllRows(
                    checked,
                    tableData?.map((row) => row._id || nanoid())
                  )
                }
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
                    const rowId = row._id || nanoid()
                    return     <CallRow
                    key={rowId}
                      onEditRow={()=>handleEditRow(rowId)}
                      onDeleteRow={()=>handleDeleteRow(rowId)}
                      row={row}
                      onSelectRow={() => onSelectRow(rowId)}
                      selected={selected.includes(rowId)}
                      onViewRow={()=>handleView(row)}
                    />
                  }
                
                  )
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
  )
}

export default CallList
