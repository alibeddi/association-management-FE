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
    orderBy?: string;
    order?: string;
    filterName?: string;
  }) => {
    let data;
    const { page, order, orderBy, filterName, limit } = payload;
    const query = `?limit=${limit}&page=${page + 1}${
      order && orderBy ? `&sort=${order === 'desc' ? `-${orderBy}` : `+${orderBy}`}` : ''
    }${filterName ? `&name=${filterName}` : ''}`;
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
    // eslint-disable-next-line prefer-destructuring
    data = response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

// DELETE MANY
export const deleteManykpis = createAsyncThunk(
  'kpi/DELETE-MANY',
  async (payload: { kpiIds: string[] }) => {
    let data;
    const { kpiIds } = payload;
    try {
      const response = await axios.delete(`kpis`, {
        data: ['65bc90024aed938391ea5690', '65bc8ffd4aed938391ea568b'],
      });
      // eslint-disable-next-line prefer-destructuring
      data = response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);

// POST ONE
export const createkpi = createAsyncThunk('kpi/POST', async (payload: { kpi: any }) => {
  let data;
  const { kpi } = payload;
  try {
    const response = await axios.post(`kpis`, kpi);
    // eslint-disable-next-line prefer-destructuring
    data = response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

// GET ONE
export const getOnekpi = createAsyncThunk('kpi/GetONE', async (payload: { kpiId: string }) => {
  let data;
  const { kpiId } = payload;
  try {
    const response = await axios.get(`kpis/${kpiId}`);
    // eslint-disable-next-line prefer-destructuring
    data = response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

// UPDATE ONE
export const updatekpi = createAsyncThunk(
  'kpi/UPDATE',
  async (payload: { kpiId: string; body: any }) => {
    let data;
    const { kpiId, body } = payload;
    try {
      const response = await axios.patch(`kpis/${kpiId}`, body);
      // eslint-disable-next-line prefer-destructuring
      data = response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);

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
    // DELETE OMANY
    builder
      .addCase(deleteManykpis.pending, (state) => {
        state.status = IStatus.FAILED;
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
        state.status = IStatus.FAILED;
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
        state.status = IStatus.FAILED;
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
        state.status = IStatus.FAILED;
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
