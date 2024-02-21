import { createSlice } from '@reduxjs/toolkit';
import { Analytics } from '../../../@types/analytics';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { getAnalytics } from './actions';

type AnalyticsState = {
  analytics: Analytics;
  status: IStatus;
};

const initialState: AnalyticsState = {
  analytics: {
    nbStatClients: 0,
    nbStatClientResponses: 0,
    nbEmployees: 0,
    nbOffices: 0,
    nbKpis: 0,
  },
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnalytics.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.analytics = action.payload;
      })
      .addCase(getAnalytics.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
