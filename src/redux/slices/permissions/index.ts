import { createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { Permission } from '../../../@types/Permission';
import { IStatus } from '../../../@types/status';
import { getPermissions } from './actions';

type PermissionState = {
  permissions: PaginationModel<Permission>;
  status: IStatus;
};

const initialState: PermissionState = {
  permissions: { docs: [], meta: {} as Meta },
  status: IStatus.IDLE,
};


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
