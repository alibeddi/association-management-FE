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
    const response = await axios.get(`kpis/${noteId}`);
    data = response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
