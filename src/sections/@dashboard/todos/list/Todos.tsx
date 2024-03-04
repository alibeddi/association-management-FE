import { Card, Divider, Grid, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getTodosAssignedToMe, getTodosCreatedbyMe } from '../../../../redux/slices/todos/actions';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import { AddNewTodo } from '../form';
import AnalyticsTasks from './TodoList';
import TodosToolbar from './TodosToolbar';

const TODO_STATUS_OPTIONS = ['todo', 'completed'];
const TODO_FILTERS = ['Created By me', 'Assigned To me'];

export default function Todos() {
  const [filterTodos, setFilterTodos] = useState('Created By me');
  const { assignedTodos, myTodos } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getTodosCreatedbyMe({ page: 1, limit: 100 }));
  }, []);

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    // setPage(0);
    console.log(newValue);
    setFilterTodos(newValue);
    if (newValue === 'created By me') {
      dispatch(getTodosCreatedbyMe({ page: 1 }));
    } else {
      dispatch(getTodosAssignedToMe({ page: 0 }));
    }
  };

  return (
    <>
      <Card sx={{ marginTop: 4 }}>
        <Tabs
          value={filterTodos}
          onChange={handleFilterStatus}
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

        {filterTodos === 'Created By me' && <AddNewTodo />}

        <TodosToolbar
          isFiltered
          filterName="search by text..."
          filterRole="filterRole"
          optionsRole={TODO_STATUS_OPTIONS}
          onFilterName={() => {}}
          onFilterRole={() => {}}
          onResetFilter={() => {}}
        />
        <Grid item xs={12} md={6} lg={8}>
          <AnalyticsTasks
            title="Tasks"
            list={filterTodos === 'Created By me' ? myTodos.docs : assignedTodos.docs}
          />
        </Grid>
      </Card>
    </>
  );
}
