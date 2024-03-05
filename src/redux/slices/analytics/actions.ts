import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const getAnalytics = createAsyncThunk('analytics/GETALL', async (query?: string) => {
  let data;
  try {
    let api;
    if (query) {
      api = `/statistics${query}`;
    } else {
      api = `/statistics`;
    }
    const response = await axios.get(api);
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

export const getNbStatClientResponsesByOffice = createAsyncThunk(
  'analytics/GETNBSTATCLIENTRESPONSESBYOFFICE',
  async (query?: string) => {
    let data;

    try {
      let api;
      if (query) {
        api = `/statistics/nb-stat-client-responses-by-office${query}`;
      } else {
        api = `/statistics/nb-stat-client-responses-by-office`;
      }
      const response = await axios.get(api);
      data = await response.data;
      if (response.status === 200) {
        return data.data.nbStatClientResponsesByOffice;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
