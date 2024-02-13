import { createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { StatClientResponse } from '../../../@types/StatClientResponse';
import { IStatus } from '../../../@types/status';
import { createStatClientResponse } from './actions';

type StatClientResState = {
  statClientResponses: PaginationModel<StatClientResponse>;
  statClientResponse: StatClientResponse | null;
  status: IStatus;
};

const initialState: StatClientResState = {
  statClientResponses: { docs: [], meta: {} as Meta },
  statClientResponse: null,
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'statClientResponses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createStatClientResponse.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(createStatClientResponse.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponse = action.payload.data;
      })
      .addCase(createStatClientResponse.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
