import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../../../@types/Notification';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { getAllNotifications } from './actions';

type NotificationInitialState = {
  notification: Notification | null;
  notifications: PaginationModel<Notification>;
  status: IStatus;
};

const initialState: NotificationInitialState = {
  notification: null,
  notifications: { docs: [], meta: {} as Meta },
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(getAllNotifications.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.notifications = action.payload;
      })
      .addCase(getAllNotifications.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
