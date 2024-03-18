import { createSlice } from '@reduxjs/toolkit';
import { Analytics, NbStatClientResponses } from '../../../@types/analytics';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { getAnalytics, getNbStatClientResponsesByOffice } from './actions';

type AnalyticsState = {
  analytics: Analytics;
  nbStatClientResponsesByOffice: NbStatClientResponses[];
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
  nbStatClientResponsesByOffice: [
    {
      nbStatClientResponses: 0,
      office: { _id: '', name: '', address: '', createdAt: undefined },
    },
  ],
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'analytics',
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
    builder
      .addCase(getNbStatClientResponsesByOffice.pending, (state) => {
        state.status = IStatus.FAILED;
      })
      .addCase(getNbStatClientResponsesByOffice.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.nbStatClientResponsesByOffice = action.payload;
      })
      .addCase(getNbStatClientResponsesByOffice.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
