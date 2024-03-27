import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllProps } from '../../../@types/api';
import axios from '../../../utils/axios';


export const getAllOffices = createAsyncThunk('/offices/all', async (payload: GetAllProps) => {
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
