import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const getAllNotifications = createAsyncThunk(
  'NOTIFICATION/GET-ALL',
  async (payload: { page: number; limit: number }) => {
    let data;
    const { page, limit = 10 } = payload;
    const params = {
      page: page + 1,
      limit,
    };
    try {
      const response = await axios.get('/notifications', { params });
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
