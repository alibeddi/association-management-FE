import { createSlice } from '@reduxjs/toolkit';
import { Office } from '../../../@types/offices';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { getAllOffices } from './actions';

type OfficeState = {
  offices: PaginationModel<Office>;
  office: Office;
  status: IStatus;
};
const initialState: OfficeState = {
  offices: { docs: [], meta: {} as Meta },
  office: {} as Office,
  status: IStatus.IDLE,
};
const slice = createSlice({
  name: 'offices',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllOffices.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getAllOffices.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.offices = action.payload;
      })
      .addCase(getAllOffices.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
