import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

type getAllProps = {
  page: number;
  limit: number;
  orderBy?: string;
  order?: string;
  name?: string;
  search?: string;
};

export const getAllOffices = createAsyncThunk('/offices/all', async (payload: getAllProps) => {
  let data;
  const { page, order = 'desc', orderBy = 'createdAt', limit = 10, name, search } = payload;
  const params = {
    page: page + 1,
    limit,
    sort: order === 'desc' ? `-${orderBy}` : `+${orderBy}`,
    ...(name ? { name } : {}),
    ...(search ? { search } : {}),
  };
  try {
    const response = await axios.get('/offices', { params });
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
