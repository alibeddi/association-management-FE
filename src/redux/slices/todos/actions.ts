import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

// get all
export const getTodosCreatedbyMe = createAsyncThunk(
  'TODOS/GET-ME',
  async (payload: { page: number; limit?: number }) => {
    const { page, limit } = payload;
    const params = {
      page: page + 1,
      limit,
    };
    let data;
    try {
      const response = await axios.get('/todos', { params });
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

// Create Todo
export const createNewTodo = createAsyncThunk(
  'STAT_CLIENT_RESPONSE/POST',
  async (payload: { body: object }) => {
    let data;
    const { body } = payload;
    try {
      const response = await axios.post('/todos', body);
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
