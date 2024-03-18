import { createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { User } from '../../../@types/User';
import { getUser, getUsers } from './actions';

type UserState = {
  users: PaginationModel<User>;
  user: User
  status: IStatus;
};

const initialState: UserState = {
  users: { docs: [], meta: {} as Meta },
  user: {} as User,
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
      })
      .addCase(getUser.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
