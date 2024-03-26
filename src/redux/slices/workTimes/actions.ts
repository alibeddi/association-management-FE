import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICalendarEvent } from '../../../@types/calendar';
import { splitIntervalIntoHours } from '../../../utils';
import axios from '../../../utils/axios';

export const getMyCalendarWorkTime = createAsyncThunk('workTimes/GETALL', async () => {
  let data;
  try {
    const response = await axios.get('/worktimes/my-worktime');
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
export const getSingleWorktime = createAsyncThunk(
  'workTimes/single',
  async (payload: { id: string }) => {
    let data;
    try {
      const { id } = payload;
      const response = await axios.get(`/worktimes/${id}`);
      data = response?.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const createCalendarWorkTime = createAsyncThunk(
  'workTimes/create',
  async (payload: ICalendarEvent) => {
    let data;

    try {
      const { startDate, endDate, title } = payload;
      const splitHours = splitIntervalIntoHours({ startDate, endDate, title });
      const response = await axios.post('/worktimes', {
        data: splitHours,
      });
      data = await response?.data;

      if (response.status === 200) {
        return data;
      }

      throw new Error(data);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
export const updateCalendarWorkTime = createAsyncThunk(
  'workTimes/update',
  async ({ id, body }: { id: string; body: ICalendarEvent }) => {
    let data;
    try {
      const response = await axios.patch(`/worktimes/${id}`, body);
      data = await response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(data);
    } catch (err) {
      console.error('error : ', err);
      return Promise.reject(err.message ? err : data?.message);
    }
  }
);
export const deleteCalendarWorkTime = createAsyncThunk(
  'workTimes/delete',
  async (payload: { id: string }) => {
    const { id } = payload;
    let data;
    try {
      const response = await axios.delete(`/worktimes/`, {
        data: {
          data: [id],
        },
      });
      data = await response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
// USER WORKTIMES
export const getUserWorktime = createAsyncThunk(
  '/user-worktimes-get',
  async ({ id }: { id: string }) => {
    let data;
    try {
      const response = await axios.get(`/worktimes/employees/${id}`);
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
export const updateUserWorktime = createAsyncThunk(
  '/user-worktimes-update',
  async ({ userId, id, body }: { userId: string; id: string; body: ICalendarEvent }) => {
    let data;
    try {
      const response = await axios.patch(`/worktimes/employees/${userId}/${id}`, body);
      data = await response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(data);
    } catch (err) {
      console.error('error : ', err);
      return Promise.reject(err.message ? err : data?.message);
    }
  }
);
export const deleteUserWorktime = createAsyncThunk(
  '/user-worktimes-delete',
  async (payload: { id: string,userId:string }) => {
    const { id,userId } = payload;
    let data;
    try {
      const response = await axios.delete(`/worktimes/employees/${userId}`, {
        data: {
          data: [id],
        },
      });
      data = await response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
