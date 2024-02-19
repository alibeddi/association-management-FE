import { createSlice } from '@reduxjs/toolkit';
import { IKpi } from '../../../@types/Kpi';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { createkpi, deleteManykpis, deleteOnekpi, getKpis, getOnekpi, updatekpi } from './actions';

type PermissionState = {
  kpis: PaginationModel<IKpi>;
  kpi: IKpi | null;
  status: IStatus;
};

const initialState: PermissionState = {
  kpis: { docs: [], meta: {} as Meta },
  kpi: null,
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'kpis',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(getKpis.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getKpis.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.kpis = action.payload;
      })
      .addCase(getKpis.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // DELETE ONE
    builder
      .addCase(deleteOnekpi.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(deleteOnekpi.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.kpis.docs = state.kpis.docs.filter((kpi) => kpi._id !== action.meta.arg.kpiId);
      })
      .addCase(deleteOnekpi.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // DELETE MANY
    builder
      .addCase(deleteManykpis.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(deleteManykpis.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        // state.kpis.docs = state.kpis.docs.filter((kpi) => kpi._id !== action.meta.arg.kpiId);
      })
      .addCase(deleteManykpis.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // CREATE ONE
    builder
      .addCase(createkpi.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(createkpi.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.kpi = action.payload.data;
      })
      .addCase(createkpi.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // GET ONE
    builder
      .addCase(getOnekpi.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getOnekpi.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.kpi = action.payload.data;
      })
      .addCase(getOnekpi.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // UPDATE ONE
    builder
      .addCase(updatekpi.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(updatekpi.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.kpi = action.payload.data;
      })
      .addCase(updatekpi.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
