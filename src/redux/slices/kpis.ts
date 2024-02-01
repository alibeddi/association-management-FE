import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IKpi } from '../../@types/Kpi';
import { Meta, PaginationModel } from '../../@types/Pagination';
import { IStatus } from '../../@types/status';
import axios from '../../utils/axios';

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
// GET ALL
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

// DELETE ONE
export const deleteOnekpi = createAsyncThunk('kpi/DELETE', async (payload: { kpiId: string }) => {
  let data;
  const { kpiId } = payload;
  try {
    const response = await axios.delete(`kpis/${kpiId}`);
    data = response.data;
    if (response.status === 200) {
      return data;
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
    // GET ALL
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
    // DELETE ONE
    builder
      .addCase(deleteOnekpi.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(deleteOnekpi.fulfilled, (state, action) => {
        console.log('I am HERE ^-^');
        state.status = IStatus.SUCCEEDED;
        console.log(action.meta.arg.kpiId);
        state.kpis.docs = state.kpis.docs.filter((kpi) => kpi._id !== action.meta.arg.kpiId);
      })
      .addCase(deleteOnekpi.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
