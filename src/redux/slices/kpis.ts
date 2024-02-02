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
export const getKpis = createAsyncThunk(
  'Kpi/GETALL',
  async (payload: {
    page: number;
    limit: number;
    sortBy?: string;
    sort?: string;
    filter?: string;
    filterValue?: string;
  }) => {
    let data;
    const { page, sort, filter, filterValue } = payload;
    const limit = 10;
    const query = `?limit=${limit}&page=${page}${sort ? `&sort=${sort}` : ''}${
      filter && filterValue ? `&${filter}=${filterValue}` : ''
    }`;

    try {
      const response = await axios.get(`/kpis${query}`);
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
        state.status = IStatus.SUCCEEDED;
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
