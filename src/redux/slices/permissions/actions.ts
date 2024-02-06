import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const getPermissions = createAsyncThunk('permissions/GETALL', async () => {
  let data;
  try {
    const response = await axios.get(`/permissions?limit=1000`);
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
