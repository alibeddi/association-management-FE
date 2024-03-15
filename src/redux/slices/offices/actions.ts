import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const getOffices = createAsyncThunk(
  'OFFICE/GET',
  async (payload: {
    page: number;
    limit: number;
    search?: string;
    orderBy?: string;
    order?: string;
  }) => {
    let data;
    const { page, limit, search, order = 'desc', orderBy = 'createdAt' } = payload;
    const params = {
      page: page + 1,
      limit,
      ...(search ? { search } : {}),
      sort: order === 'desc' ? `-${orderBy}` : `+${orderBy}`,
    };
    try {
      const response = await axios.get(`/offices`, { params });
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
