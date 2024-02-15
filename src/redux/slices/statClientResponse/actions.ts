import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

type StatClientResBody = {
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

// get all
export const getAllStatClientResponses = createAsyncThunk(
  'STAT_CLIENT_RESPONSE/GET-ALL',
  async (payload: {
    page: number;
    limit?: number;
    orderBy?: string;
    order?: string;
    filterClientName?: string;
  }) => {
    const { page, order = 'desc', orderBy = 'createdAt', filterClientName, limit = 10 } = payload;
    const params = {
      page: page + 1,
      limit,
      sort: order === 'desc' ? `-${orderBy}` : `+${orderBy}`,
      ...(filterClientName ? { clientName: filterClientName } : {}),
    };
    let data;
    try {
      const response = await axios.get('/stat-client-responses', { params });
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

// get one
export const getOneStatClientResponse = createAsyncThunk(
  'STAT_CLIENT_RESPONSE/GET-ONE',
  async (payload: { statClientResponseId: string }) => {
    const { statClientResponseId } = payload;
    let data;
    try {
      const response = await axios.get(`/stat-client-responses/${statClientResponseId}`);
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

// edit
export const editStatClientResponse = createAsyncThunk(
  'STAT_CLIENT_RESPONSE/EDIT',
  async (payload: { statClientResponseId: string; body: object }) => {
    const { statClientResponseId, body } = payload;
    let data;
    try {
      const response = await axios.patch(`/stat-client-responses/${statClientResponseId}`, body);
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

// delete
export const deleteStatClientResponse = createAsyncThunk(
  'STAT_CLIENT_RESPONSE/DELETE',
  async (payload: { statClientResponseId: string }) => {
    const { statClientResponseId } = payload;
    let data;
    try {
      const response = await axios.delete(`/stat-client-responses/${statClientResponseId}`);
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
