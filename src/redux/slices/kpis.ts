import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IKpi } from '../../@types/Kpi';
import { Meta, PaginationModel } from '../../@types/Pagination';
import { IStatus } from '../../@types/status';
import axios from '../../utils/axios';

type PermissionState = {
  kpis: PaginationModel<IKpi>;
  status: IStatus;
};

const initialState: PermissionState = {
  kpis: { docs: [], meta: {} as Meta },
  status: IStatus.IDLE,
};

export const getKpis = createAsyncThunk('Kpi/GETALL', async () => {
  let data;
  try {
    const response = await axios.get(`/kpis`);
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
  name: 'kpis',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKpis.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getKpis.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.kpis = action.payload;
      })
      .addCase(getKpis.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
