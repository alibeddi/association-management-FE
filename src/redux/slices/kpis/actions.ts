import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

// GET ALL
export const getKpis = createAsyncThunk(
  'Kpi/GETALL',
  async (payload: {
    page: number;
    limit?: number;
    orderBy?: string;
    order?: string;
    search?: string;
    filterValue?: string;
  }) => {
    let data;
    const {
      page,
      order = 'desc',
      orderBy = 'createdAt',
      search,
      limit = 10,
      filterValue,
    } = payload;
    const params = {
      page: page + 1,
      limit,
      sort: order === 'desc' ? `-${orderBy}` : `+${orderBy}`,
      ...(search ? { search } : {}),
      ...(filterValue !== 'all' ? { frontType: filterValue } : {}),
    };
    try {
      const response = await axios.get('/kpis', { params });
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

// DELETE MANY
export const deleteManykpis = createAsyncThunk(
  'kpi/DELETE-MANY',
  async (payload: { kpiIds: string[] }) => {
    let data;
    const { kpiIds } = payload;
    try {
      const response = await axios.delete('kpis', {
        data: {
          data: kpiIds,
        },
      });

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
export const createkpi = createAsyncThunk('kpi/POST', async (payload: { kpi: object }) => {
  let data;
  const { kpi } = payload;
  try {
    const response = await axios.post(`kpis`, kpi);

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
  async (payload: { kpiId: string; body: object }) => {
    let data;
    const { kpiId, body } = payload;
    try {
      const response = await axios.patch(`kpis/${kpiId}`, body);
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
