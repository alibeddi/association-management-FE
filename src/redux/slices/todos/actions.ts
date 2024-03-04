import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

// get Created By me
export const getTodosCreatedbyMe = createAsyncThunk(
  'TODOS/GET-ME',
  async (payload: {
    page: number;
    limit?: number;
    filterDescription?: string;
    filterStatus?: string;
  }) => {
    const { page, limit, filterDescription, filterStatus } = payload;
    const params = {
      page: page + 1,
      limit,
      ...(filterDescription ? { search: filterDescription } : {}),
      ...(filterStatus !== 'all' ? { status: filterStatus } : {}),
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

// get Assigned to me
export const getTodosAssignedToMe = createAsyncThunk(
  'TODOS/GET-ASSIGN',
  async (payload: {
    page: number;
    limit?: number;
    filterDescription?: string;
    filterStatus?: string;
  }) => {
    const { page, limit, filterDescription, filterStatus } = payload;
    const params = {
      page: page + 1,
      limit,
      ...(filterDescription ? { search: filterDescription } : {}),
      ...(filterStatus !== 'all' ? { status: filterStatus } : {}),
    };
    let data;
    try {
      const response = await axios.get('/todos/assignments', { params });
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
export const createNewTodo = createAsyncThunk('TODOS/POST', async (payload: { body: object }) => {
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
});

// DELETE ONE
export const deleteOneTodo = createAsyncThunk(
  'TODOS/DELETE',
  async (payload: { todoId: string }) => {
    let data;
    const { todoId } = payload;
    try {
      const response = await axios.delete(`todos/${todoId}`);
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

// UPDATE ONE
export const updateTodo = createAsyncThunk(
  'TODOS/EDIT',
  async (payload: { todoId: string; body: object }) => {
    let data;
    const { todoId, body } = payload;
    try {
      const response = await axios.patch(`todos/${todoId}`, body);
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
