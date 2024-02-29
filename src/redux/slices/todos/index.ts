import { createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { Todo } from '../../../@types/Todo';
import { createNewTodo, getTodosCreatedbyMe } from './actions';

type TodoInitialState = {
  todo: Todo;
  mytodos: PaginationModel<Todo>;
  assignedTodos: PaginationModel<Todo>;
  status: IStatus;
};

const initialState: TodoInitialState = {
  mytodos: { docs: [], meta: {} as Meta },
  assignedTodos: { docs: [], meta: {} as Meta },
  todo: {} as Todo,
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder
      .addCase(createNewTodo.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(createNewTodo.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.mytodos.docs = [...state.mytodos.docs, action.payload.data];
      })
      .addCase(createNewTodo.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // get all
    builder
      .addCase(getTodosCreatedbyMe.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getTodosCreatedbyMe.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.mytodos = action.payload.data;
      })
      .addCase(getTodosCreatedbyMe.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});
export default slice.reducer;
