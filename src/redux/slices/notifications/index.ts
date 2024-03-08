import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../../../@types/Notification';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import {
  getAllNotifications,
  getUnreadNotificationsNumber,
  marlAllNotificationsAsRead,
} from './actions';

type NotificationInitialState = {
  unreadNotifications: number;
  notifications: PaginationModel<Notification>;
  status: IStatus;
};

const initialState: NotificationInitialState = {
  unreadNotifications: 0,
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
    // GET UNREAD NOTIFICATIONS NUMBER
    builder
      .addCase(getUnreadNotificationsNumber.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getUnreadNotificationsNumber.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.unreadNotifications = action.payload.unreadNotifications;
      })
      .addCase(getUnreadNotificationsNumber.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // MARK ALL AS READ
    builder
      .addCase(marlAllNotificationsAsRead.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(marlAllNotificationsAsRead.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.unreadNotifications = 0;
      })
      .addCase(marlAllNotificationsAsRead.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
