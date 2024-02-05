import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../@types/Pagination';
import { Permission } from '../../@types/Permission';
import { IStatus } from '../../@types/status';
import axios from '../../utils/axios';

type PermissionState = {
  permissions: PaginationModel<Permission>;
  status: IStatus;
};

const initialState: PermissionState = {
  permissions: { docs: [], meta: {} as Meta },
  status: IStatus.IDLE,
};

export const getPermissions = createAsyncThunk('permissions/GETALL', async () => {
  let data;
  try {
    const response = await axios.get(`/permissions?limit=1000`);
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

const slice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPermissions.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.permissions = action.payload;
      })
      .addCase(getPermissions.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
