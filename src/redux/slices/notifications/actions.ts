import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const getAllNotifications = createAsyncThunk(
  'NOTIFICATION/GET-ALL',
  async (payload: { page: number; limit: number; filterStatus?: string }) => {
    let data;
    const { page, limit = 10, filterStatus } = payload;
    const seen = filterStatus === 'read';
    const params = {
      page: page + 1,
      limit,
      ...(filterStatus !== 'all' ? { seen } : {}),
    };
    try {
      const response = await axios.get('/notifications', { params });
      data = await response.data;
      if (response.status === 200) {
        return data.data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);

export const getNotificationsCounts = createAsyncThunk('NOTIFICATION/COUNTS', async () => {
  let data;
  try {
    const response = await axios.get('/notifications/counts');
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

export const marlAllNotificationsAsRead = createAsyncThunk('NOTIFICATION/PATCH', async () => {
  let data;
  try {
    const response = await axios.patch('/notifications');
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

export const markOneNotificationAsRead = createAsyncThunk(
  'NOTIFICATION/PATCH-ONE',
  async (notificationId: string) => {
    let data;
    try {
      const response = await axios.patch(`/notifications/${notificationId}`);
      data = await response.data;
      if (response.status === 200) {
        return data.data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
