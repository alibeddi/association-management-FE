import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFilterStatClientResponse } from '../../../@types/FilterStatClientResponse';
import { generateFilterStatClientResponse } from '../../../utils';
import axios from '../../../utils/axios';

type StatClientResBody = {
  clientName: string;
  statClient: string;
  clientContact: string;
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
    filterStatClient?: string;
  }) => {
    const {
      page,
      order = 'desc',
      orderBy = 'createdAt',
      filterClientName,
      limit,
      filterStatClient,
    } = payload;
    const params = {
      page: page + 1,
      limit,
      sort: order === 'desc' ? `-${orderBy}` : `+${orderBy}`,
      ...(filterClientName ? { clientName: filterClientName } : {}),
      ...(filterStatClient ? { statClient: filterStatClient } : {}),
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

// delete one
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

// delete many
export const deleteManyStatClientResponse = createAsyncThunk(
  'STAT_CLIENT_RESPONSE/DELETE-MANY',
  async (payload: { statClientResponses: string[] }) => {
    const { statClientResponses } = payload;
    let data;
    try {
      const response = await axios.delete(`/stat-client-responses/delete`, {
        data: {
          statClientResponseIds: statClientResponses,
        },
      });
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
export const statsClientResponseFilter = createAsyncThunk(
  'STAT_CLIENT_RESPONSE/FILTER',
  async (payload: {
    page: number;
    limit?: number;
    orderBy?: string;
    order?: string;
    filterClientName?: string;
    filterValue: IFilterStatClientResponse[];
  }) => {
    const { page, limit, filterValue } = payload;
    let data;
    try {
      const query = generateFilterStatClientResponse(filterValue, limit, page);

      const response = await axios.get(`/stat-client-responses/filter?${query}`);
      data = response.data;
      if (response.status === 200) {
        return data.data;
      }
      throw new Error(response.statusText);
    } catch (error) {
      return Promise.reject(error?.message ? error.message : data.message);
    }
  }
);
