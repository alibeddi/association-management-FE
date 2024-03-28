import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetAllProps, IGetAll } from '../../../@types/api';
import { ICall } from '../../../@types/Call';
import { fDate } from '../../../utils';
import axios from '../../../utils/axios';

interface GetAll extends GetAllProps {
  startDate?: Date | string | null;
  endDate?: Date | string | null;
}

export const getMyCalls = createAsyncThunk('/calls/me', async () => {
  let data;
  try {
    const response = await axios.get('/calls/me');
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data?.message);
  }
});
export const createCallsToday = createAsyncThunk('/calls/create', async (newCall: ICall) => {
  let data;
  try {
    const response = await axios.post('/calls', newCall);
    data = await response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data.message);
  }
});
export const updateCall = createAsyncThunk(
  '/calls/update',
  async ({ newCall }: { newCall: ICall }) => {
    let data;
    try {
      const response = await axios.patch(`/calls/${newCall._id}`, {
        date: newCall.date,
        calls: newCall.calls,
      });
      data = response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (error) {
      return Promise.reject(error.message ? error.message : data.message);
    }
  }
);
export const getCallByDate = createAsyncThunk(
  '/calls/date',
  async ({ date }: { date: Date | string }) => {
    let data;
    try {
      const response = await axios.get(`/calls/date?date=${date}`);
      data = response.data;
      if (response.status === 200) {
        return data.data;
      }
      throw new Error(response.statusText);
    } catch (error) {
      return Promise.reject(error.message ? error.message : data.message);
    }
  }
);
export const getCallById = createAsyncThunk('/calls/id', async ({ id }: { id: string }) => {
  let data;
  try {
    const response = await axios.get(`/calls/${id}`);
    data = response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data.message);
  }
});
export const getAllCall = createAsyncThunk('/calls/all', async (payload: GetAll) => {
  let data;
  const {
    page,
    order = 'desc',
    orderBy = 'createdAt',
    filterName,
    limit,
    startDate,
    endDate,
  } = payload;
  const params = {
    page: page + 1,
    limit,
    sort: order === 'desc' ? `-${orderBy}` : `+${orderBy}`,
    ...(filterName ? { name: filterName } : {}),
    startDate,
    endDate,
  };
  if (startDate && endDate) {
    params.startDate = new Date(startDate).toISOString();
    params.endDate = new Date(endDate).toISOString();
  }
  try {
    const response = await axios.get('/calls', { params });
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data?.message);
  }
});
