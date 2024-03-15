import { createSlice } from '@reduxjs/toolkit';
import { Office } from '../../../@types/Office';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { getOffices } from './actions';

type PermissionState = {
  offices: PaginationModel<Office>;
  status: IStatus;
};

const initialState: PermissionState = {
  offices: { docs: [], meta: {} as Meta },
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'offices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOffices.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getOffices.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.offices = action.payload;
      })
      .addCase(getOffices.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
