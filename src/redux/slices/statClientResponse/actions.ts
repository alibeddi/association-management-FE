import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

type StatClientResBody = {
  // clientContact: string;
  clientName: any;
  kpis: {
    kpi: string;
    response: any;
  }[];
};
export const createStatClientResponse = createAsyncThunk(
  'STAT_CLIENT_RESPONSE/POST',
  async (payload: { statClientId: string; body: StatClientResBody }) => {
    let data;
    const { body } = payload;
    try {
      const response = await axios.post('/stat-client-responses', body);
      data = response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      return Promise.reject(err.message ? err.message : data?.message);
    }
  }
);
