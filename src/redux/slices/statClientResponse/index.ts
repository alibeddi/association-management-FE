import { createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { StatClientResponse } from '../../../@types/StatClientResponse';
import { IStatus } from '../../../@types/status';
import {
  createStatClientResponse,
  deleteStatClientResponse,
  editStatClientResponse,
  getAllStatClientResponses,
  getOneStatClientResponse,
} from './actions';

type StatClientResState = {
  statClientResponses: PaginationModel<StatClientResponse>;
  statClientResponse: StatClientResponse;
  status: IStatus;
};

const initialState: StatClientResState = {
  statClientResponses: { docs: [], meta: {} as Meta },
  statClientResponse: {} as StatClientResponse,
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'statClientResponses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
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
    // get all
    builder
      .addCase(getAllStatClientResponses.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getAllStatClientResponses.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponses = action.payload.data;
      })
      .addCase(getAllStatClientResponses.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // get one
    builder
      .addCase(getOneStatClientResponse.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getOneStatClientResponse.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponse = action.payload.data;
      })
      .addCase(getOneStatClientResponse.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // edit Stat-client-response
    builder
      .addCase(editStatClientResponse.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(editStatClientResponse.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponse = action.payload.data;
      })
      .addCase(editStatClientResponse.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // delete Stat-client-response
    builder
      .addCase(deleteStatClientResponse.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(deleteStatClientResponse.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.statClientResponses.docs = state.statClientResponses.docs.filter(
          (statClientResponse) => statClientResponse._id !== action.meta.arg.statClientResponseId
        );
      })
      .addCase(deleteStatClientResponse.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
