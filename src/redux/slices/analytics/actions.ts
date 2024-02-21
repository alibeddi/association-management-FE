import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const getAnalytics = createAsyncThunk('analytics/GETALL', async () => {
  let data;
  try {
    const response = await axios.get(`/statistics`);
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});