import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../../../@types/Notification';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import { getAllNotifications, getNotificationsCounts, marlAllNotificationsAsRead } from './actions';

export type ICount = { total: number; read: number; unread: number };
type NotificationInitialState = {
  notificationCounts: ICount;
  notifications: PaginationModel<Notification>;
  status: IStatus;
};

const initialState: NotificationInitialState = {
  notificationCounts: { total: 0, read: 0, unread: 0 },
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
      .addCase(getNotificationsCounts.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getNotificationsCounts.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.notificationCounts = action.payload.result;
      })
      .addCase(getNotificationsCounts.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // MARK ALL AS READ
    builder
      .addCase(marlAllNotificationsAsRead.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(marlAllNotificationsAsRead.fulfilled, (state) => {
        state.status = IStatus.SUCCEEDED;
        state.notificationCounts = {
          ...state.notificationCounts,
          read: state.notificationCounts.total,
          unread: 0,
        };
      })
      .addCase(marlAllNotificationsAsRead.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
