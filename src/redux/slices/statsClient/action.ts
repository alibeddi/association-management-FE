import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGetAll } from '../../../@types/api';
import { IStatsClient, IStatsClients } from '../../../@types/statsClient';
import axios from '../../../utils/axios';

const STAT_CLIENT_URI = 'stat-clients';

interface GetAllProps extends IGetAll {
  filterName?: string;
  page: number;
  limit: number;
  orderBy?: string;
  order?: string;
}

export const getAllStatsClient = createAsyncThunk('/statsClient/', async (payload: GetAllProps) => {
  let data;
  const { page, order = 'desc', orderBy = 'createdAt', filterName, limit } = payload;
  const params = {
    page: page + 1,
    limit,
    sort: order === 'desc' ? `-${orderBy}` : `+${orderBy}`,
    ...(filterName ? { name: filterName } : {}),
  };
  try {
    const response = await axios.get(`/${STAT_CLIENT_URI}`, { params });
    data = await response.data;
    if (response.status === 200) return data;
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data?.message);
  }
});
export const createStatsClient = createAsyncThunk(
  '/statsClient/new',
  async (newStatsClient: Partial<IStatsClients>) => {
    let data;
    try {
      const response = await axios.post(`/${STAT_CLIENT_URI}`, newStatsClient);
      data = await response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (error) {
      return Promise.reject(error.message ?? data?.message);
    }
  }
);
export const getSingleStatsClient = createAsyncThunk(
  '/statsClient/single',
  async ({ id }: { id: string }) => {
    let data;
    try {
      const response = await axios.get(`/${STAT_CLIENT_URI}/${id}`);
      data = await response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (error) {
      return Promise.reject(error.message ?? data?.message);
    }
  }
);
export const updateStatsClient = createAsyncThunk(
  '/statsClient/update',
  async ({ id, body }: { id: string; body: Partial<IStatsClients> }) => {
    let data;
    try {
      const response = await axios.patch(`/${STAT_CLIENT_URI}/${id}`, body);
      data = await response.data;
      if (response.status === 200) return data;
      throw new Error(response.statusText);
    } catch (error) {
      return Promise.reject(error.message ? error.message : data.message);
    }
  }
);
export const deleteStatsClient = createAsyncThunk(
  '/statsClient/delete',
  async ({ id }: { id: string }) => {
    let data;
    try {
      const response = await axios.delete(`/${STAT_CLIENT_URI}/${id}`);
      data = await response.data;
      if (response.status === 200) {
        return { id, data };
      }
      throw new Error(response.statusText);
    } catch (error) {
      return Promise.reject(error.message ?? data?.message);
    }
  }
);
export const deleteManyStatsClient = createAsyncThunk(
  '/statsClient/delete/many',
  async (body: { statClientIds: string[] }) => {
    let data;
    try {
      const response = await axios.delete(`/${STAT_CLIENT_URI}/delete`, {
        data: body,
      });
      data = await response.data;
      if (response.status === 200) {
        return { data, statClientIds: body.statClientIds };
      }
      throw new Error(response.statusText);
    } catch (error) {
      return Promise.reject(error.message ?? data?.message);
    }
  }
);
