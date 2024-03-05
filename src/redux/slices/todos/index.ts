import { createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { Todo } from '../../../@types/Todo';
import {
  createNewTodo,
  deleteOneTodo,
  getTodosAssignedToMe,
  getTodosCreatedbyMe,
  updateTodo,
} from './actions';

type TodoInitialState = {
  todo: Todo;
  todos: PaginationModel<Todo>;
  status: IStatus;
};

const initialState: TodoInitialState = {
  todos: { docs: [], meta: {} as Meta },
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
        state.todos.docs = [action.payload.data, ...state.todos.docs];
      })
      .addCase(createNewTodo.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // get Created By me
    builder
      .addCase(getTodosCreatedbyMe.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getTodosCreatedbyMe.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.todos = action.payload.data;
      })
      .addCase(getTodosCreatedbyMe.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // get Assigned To me
    builder
      .addCase(getTodosAssignedToMe.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getTodosAssignedToMe.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.todos = action.payload.data;
      })
      .addCase(getTodosAssignedToMe.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // Delete one
    builder
      .addCase(deleteOneTodo.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(deleteOneTodo.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.todos.docs = state.todos.docs.filter((todo) => todo._id !== action.meta.arg.todoId);
      })
      .addCase(deleteOneTodo.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // Edit one
    builder
      .addCase(updateTodo.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.todos.docs = state.todos.docs.map((todo) =>
          todo._id !== action.meta.arg.todoId ? todo : action.payload.data
        );
      })
      .addCase(updateTodo.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});
export default slice.reducer;
