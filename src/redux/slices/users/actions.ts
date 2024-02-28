import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const getUsers = createAsyncThunk(
  'users/GETALL',
  async (body: { page: number; limit: number,name?:string }) => {
    let data;
    try {
      const response = await axios.get(`/users`, {
        params: { page: body.page + 1, limit: body.limit,name:body.name },
      });
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
export const deleteOne = createAsyncThunk('users/DELETE', async (payload: { userId: string }) => {
  let data;
  const { userId } = payload;
  try {
    const response = await axios.delete(`users/${userId}`);
    data = response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
