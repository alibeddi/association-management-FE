import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

// POST
export const createNote = createAsyncThunk('NOTE/POST', async (note: object) => {
  let data;
  try {
    const response = await axios.post(`notes`, note);

    data = response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
// EDIT
export const editNote = createAsyncThunk(
  'NOTE/EDIT',
  async (payload: { noteId: string; note: object }) => {
    let data;
    const { noteId, note } = payload;
    try {
      const response = await axios.patch(`notes/${noteId}`, note);
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

// GET ONE
export const getOneNote = createAsyncThunk('NOTE/GetONE', async (payload: { noteId: string }) => {
  let data;
  const { noteId } = payload;
  try {
    const response = await axios.get(`notes/${noteId}`);
    data = response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

// GET ALL
export const getAllNotes = createAsyncThunk(
  'NOTE/GETALL',
  async (payload: {
    page: number;
    limit?: number;
    orderBy?: string;
    order?: string;
    search?: string;
  }) => {
    let data;
    const { page, order = 'desc', orderBy = 'createdAt', search, limit = 10 } = payload;
    const params = {
      page,
      limit,
      sort: order === 'desc' ? `-${orderBy}` : `+${orderBy}`,
      ...(search ? { search } : {}),
    };
    try {
      const response = await axios.get('/notes', { params });
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
export const deleteOneNote = createAsyncThunk(
  'NOTE/DELETE',
  async (payload: { noteId: string }) => {
    let data;
    const { noteId } = payload;
    try {
      const response = await axios.delete(`notes/${noteId}`);
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
