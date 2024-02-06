import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from 'src/@types/Pagination';
import { IStatus } from 'src/@types/status';
import { User } from 'src/@types/User';
import axios from '../../utils/axios';

type UserState = {
  users: PaginationModel<User>;
  status: IStatus;
};

const initialState: UserState = {
  users: { docs: [], meta: {} as Meta },
  status: IStatus.IDLE,
};

export const getUsers = createAsyncThunk(
  'users/GETALL',
  async (body: { page: number; limit: number }) => {
    let data;
    try {
      const response = await axios.get(`/users`, {
        params: { page: body.page+1, limit: body.limit },
      });
      data = await response.data;
      if (response.status === 200) {
        return data.data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);

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
