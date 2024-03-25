import { createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatsClient } from '../../../@types/statsClient';
import { IStatus } from '../../../@types/status';
import {
  createStatsClient,
  getAllStatsClient,
  getSingleStatsClient,
  deleteStatsClient,
  deleteManyStatsClient,
} from './action';

type StatsClientState = {
  statsClients: PaginationModel<IStatsClient>;
  statsClient: IStatsClient;
  statClientId: string | undefined;
  status: IStatus;
};
const initialState: StatsClientState = {
  statsClients: { docs: [], meta: {} as Meta },
  statsClient: {} as IStatsClient,
  statClientId: undefined,
  status: IStatus.IDLE,
};
const slice = createSlice({
  name: 'statsClient',
  initialState,
  reducers: {
    reset: (state) => {
      state.statsClient = {} as IStatsClient;
    },
    setCurrentStatClientId: (state, action) => {
      state.statClientId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStatsClient.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(createStatsClient.fulfilled, (state, { payload }) => {
        state.status = IStatus.SUCCEEDED;
        state.statsClients.docs = [...state.statsClients.docs, payload];
      })
      .addCase(createStatsClient.rejected, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getAllStatsClient.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getAllStatsClient.fulfilled, (state, { payload }) => {
        state.status = IStatus.SUCCEEDED;
        state.statsClients = payload.data;
      })
      .addCase(getAllStatsClient.rejected, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getSingleStatsClient.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getSingleStatsClient.fulfilled, (state, { payload }) => {
        state.status = IStatus.SUCCEEDED;
        state.statsClient = { ...payload.data };
      })
      .addCase(getSingleStatsClient.rejected, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(deleteStatsClient.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(deleteStatsClient.fulfilled, (state, { payload }) => {
        state.status = IStatus.SUCCEEDED;
        state.statsClients.docs = state.statsClients.docs.filter((stat) => stat._id !== payload.id);
      })
      .addCase(deleteStatsClient.rejected, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(deleteManyStatsClient.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(deleteManyStatsClient.fulfilled, (state, { payload }) => {
        state.status = IStatus.SUCCEEDED;
        state.statsClients.docs = state.statsClients.docs.filter(
          (stat) => !payload.statClientIds.includes(stat._id)
        );
      })
      .addCase(deleteManyStatsClient.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});
export const { setCurrentStatClientId } = slice.actions;
export default slice.reducer;
