import { createSlice } from '@reduxjs/toolkit';
import { Notification } from '../../../@types/Notification';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import {
  getAllNotifications,
  getNotificationsCounts,
  markOneNotificationAsRead,
  marlAllNotificationsAsRead,
} from './actions';

type NotificationInitialState = {
  unread: number;
  notifications: PaginationModel<Notification>;
  status: IStatus;
};

const initialState: NotificationInitialState = {
  unread: 0,
  notifications: { docs: [], meta: {} as Meta },
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = IStatus.IDLE;
    },
  },
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
        state.unread = action.payload.unread;
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
        state.unread = 0;
      })
      .addCase(marlAllNotificationsAsRead.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // MARK ONE AS READ
    builder
      .addCase(markOneNotificationAsRead.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(markOneNotificationAsRead.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.notifications.docs = state.notifications.docs.filter(
          (notification) => notification._id !== action.meta.arg
        );
        state.unread -= 1;
      })
      .addCase(markOneNotificationAsRead.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});
export const { resetStatus } = slice.actions;
export default slice.reducer;
