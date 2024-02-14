import { createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatsClient } from '../../../@types/statsClient';
import { IStatus } from '../../../@types/status';
import { createStatsClient, getAllStatsClient, getOneStatClient } from './action';

type StatsClientState = {
  statsClients: PaginationModel<IStatsClient>;
  statsClient: IStatsClient;
  status: IStatus;
};
const initialState: StatsClientState = {
  statsClients: { docs: [], meta: {} as Meta },
  statsClient: {} as IStatsClient,
  status: IStatus.IDLE,
};
const slice = createSlice({
  name: 'statsClient',
  initialState,
  reducers: {},
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
      // get ONE stat-client
      .addCase(getOneStatClient.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getOneStatClient.fulfilled, (state, { payload }) => {
        state.status = IStatus.SUCCEEDED;
        state.statsClient = payload.data;
      })
      .addCase(getOneStatClient.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});
export const { actions } = slice;
export default slice.reducer;
