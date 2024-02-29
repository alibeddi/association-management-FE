import { Card, Divider, Grid, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { AddNewTodo } from '../form';
import AnalyticsTasks from './TodoList';
import TodosToolbar from './TodosToolbar';

const TODO_STATUS_OPTIONS = ['todo', 'in progress', 'blocked', 'completed', 'canceled'];

export default function Todos() {
  const STATUS_OPTIONS = ['Created By me', 'Assigned To me'];
  const [filterTodos, setFilterTodos] = useState('Created By me');
  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    // setPage(0);
    setFilterTodos(newValue);
    if (newValue === 'created By me') {
      console.log('fetch the todos created by me ');
    } else {
      console.log('fetch the todos assigned to me ');
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
          {STATUS_OPTIONS.map((tab) => (
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
            list={[
              { id: '1', label: 'Create FireStone Logo' },
              { id: '2', label: 'Add SCSS and JS files if required' },
              { id: '3', label: 'Stakeholder Meeting' },
              { id: '4', label: 'Scoping & Estimations' },
              { id: '5', label: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Card>
    </>
  );
}
