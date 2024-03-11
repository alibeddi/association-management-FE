import { Card, CardHeader, Divider, Grid, Tab, Tabs } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Todo } from '../../../../@types/Todo';
import EmptyContent from '../../../../components/empty-content';
import { TablePaginationCustom, useTable } from '../../../../components/table';
import {
  deleteOneTodo,
  getTodosAssignedToMe,
  getTodosCreatedbyMe,
} from '../../../../redux/slices/todos/actions';
import { RootState, dispatch, useSelector } from '../../../../redux/store';
import { AddNewTodo } from '../form';
import { TaskItem } from './TodoItem';
import TodosToolbar from './TodosToolbar';

const TODO_STATUS_OPTIONS = ['all', 'todo', 'completed'];
const TODO_FILTERS = ['Created By me', 'Assigned To me'];

export default function TodoList() {
  const {
    dense,
    page,
    rowsPerPage,
    setPage,
    //
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const location = useLocation();
  const highlightedTodoId = location.state?.highlightedTodoId;

  const { enqueueSnackbar } = useSnackbar();

  const { todos: data } = useSelector((state: RootState) => state.todos);

  const [filterTodos, setFilterTodos] = useState('Created By me');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  const [filterDescription, setFilterDescription] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>(null);

  const isFiltered =
    filterDescription !== '' || filterStatus !== 'all' || (!!filterStartDate && !!filterEndDate);
  const isNotFound =
    (!todos.length && !!filterDescription) ||
    (!todos.length && !!filterStatus) ||
    (!todos.length && !!filterEndDate) ||
    (!todos.length && !!filterStartDate) ||
    !todos.length;

  const dataInPage = todos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    if (highlightedTodoId) {
      setFilterTodos('Assigned To me');
    }
  }, [highlightedTodoId]);

  useEffect(() => {
    const params = {
      page,
      limit: rowsPerPage,
      filterDescription,
      filterStatus,
      filterStartDate,
      filterEndDate,
    };
    if (filterTodos === 'Assigned To me') {
      dispatch(getTodosAssignedToMe(params));
    } else {
      dispatch(getTodosCreatedbyMe(params));
    }
  }, [
    filterTodos,
    page,
    rowsPerPage,
    filterDescription,
    filterStatus,
    filterStartDate,
    filterEndDate,
  ]);

  useEffect(() => {
    setTodos(data?.docs);
  }, [data, filterTodos]);

  const handleChangeTabs = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterTodos(newValue);
    if (newValue === 'Created By me') {
      dispatch(getTodosCreatedbyMe({ page: 0, limit: rowsPerPage }));
    } else {
      dispatch(getTodosAssignedToMe({ page: 0, limit: rowsPerPage }));
    }
    handleResetFilter();
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteOneTodo({ todoId: id }))
      .unwrap()
      .then((res) => enqueueSnackbar(`${res?.message}`))
      .catch((err) => enqueueSnackbar(`${err?.message}`, { variant: 'error' }));

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleEditTodo = (task: Todo) => {
    setIsEdit(true);
    setCurrentTodo(task);
  };

  const handleResetFilter = () => {
    setPage(0);
    setFilterDescription('');
    setFilterStatus('all');
    setFilterEndDate(null);
    setFilterStartDate(null);
  };
  const handleFilterStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterStatus(event.target.value);
  };

  const handleFilterDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterDescription(event.target.value);
  };

  return (
    <>
      <Card sx={{ marginTop: 4 }}>
        <Tabs
          value={filterTodos}
          onChange={handleChangeTabs}
          sx={{
            px: 2,
            bgcolor: 'background.neutral',
          }}
        >
          {TODO_FILTERS.map((tab) => (
            <Tab key={tab} label={tab} value={tab} />
          ))}
        </Tabs>

        <Divider />

        {filterTodos === 'Created By me' && (
          <AddNewTodo
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setCurrentTodo={setCurrentTodo}
            currentTodo={currentTodo}
          />
        )}

        <TodosToolbar
          placeholder="search by text..."
          isFiltered={isFiltered}
          filterDescription={filterDescription}
          filterStatus={filterStatus}
          filterEndDate={filterEndDate}
          filterStartDate={filterStartDate}
          optionsStatus={TODO_STATUS_OPTIONS}
          onFilterDescription={handleFilterDescription}
          onFilterStatus={handleFilterStatus}
          onResetFilter={handleResetFilter}
          onFilterStartDate={(newValue) => {
            setFilterStartDate(newValue);
          }}
          onFilterEndDate={(newValue) => {
            setFilterEndDate(newValue);
          }}
        />
        <Grid item xs={12} md={6} lg={8}>
          <CardHeader title="Tasks" />
          {todos.map((task) => (
            <TaskItem
              highlighted={highlightedTodoId}
              key={task._id}
              task={task}
              onDeleteTodo={handleDeleteTodo}
              onEditTodo={handleEditTodo}
              canDelete={filterTodos === 'Created By me'}
            />
          ))}

          {isNotFound && (
            <EmptyContent
              title="No Data"
              sx={{
                '& span.MuiBox-root': { height: 160 },
              }}
            />
          )}
          <TablePaginationCustom
            count={data.meta.totalDocs || 0}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Grid>
      </Card>
    </>
  );
}
