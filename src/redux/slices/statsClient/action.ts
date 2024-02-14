import { createAsyncThunk } from '@reduxjs/toolkit';
import { IStatsClient } from '../../../@types/statsClient';
import axios from '../../../utils/axios';

const STAT_CLIENT_URI = 'stat-clients';

export const getAllStatsClient = createAsyncThunk('/statsClient/', async () => {
  let data;
  try {
    const response = await axios.get(`/${STAT_CLIENT_URI}`);
    data = await response.data;
    if (response.status === 200) return data;
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data?.message);
  }
});
export const createStatsClient = createAsyncThunk(
  '/statsClient/new',
  async (newStatsClient: IStatsClient) => {
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

// GET ONE

export const getOneStatClient = createAsyncThunk(
  '/stat-client/GET',
  async (payload: { statClientId: string }) => {
    let data;
    const { statClientId } = payload;
    try {
      const response = await axios.get(`/${STAT_CLIENT_URI}/${statClientId}`);
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
