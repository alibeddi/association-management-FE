import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IColor } from '../../@types/color';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

type colorState = {
  colors: IColor[] | [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
};
const initialState: colorState = {
  status: 'idle',
  colors: [],
};

// ----------------------------------------------------------------------

export const getAllColors = createAsyncThunk(
  'color/getAllColors',
  async ({ isPaging }: { isPaging: boolean }) => {
    let data;
    try {
      const response = await axios.get(`/colors?isPaging=${isPaging}`);
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

const slice = createSlice({
  name: 'color',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.colors = action.payload;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

// Reducer
export const { reducer } = slice;
export default slice;
