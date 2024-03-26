import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

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
