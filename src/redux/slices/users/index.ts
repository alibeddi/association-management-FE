import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { User } from '../../../@types/User';
import { getUsers } from './actions';

type UserState = {
  users: PaginationModel<User>;
  status: IStatus;
};

const initialState: UserState = {
  users: { docs: [], meta: {} as Meta },
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
