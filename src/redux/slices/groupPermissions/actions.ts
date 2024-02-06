import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

export const getAllPermissionGroups = createAsyncThunk('group-permissions/GETALL', async () => {
  let data;
  try {
    const response = await axios.get(`/permission-groups`);
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

export const getPermissionGroup = createAsyncThunk(
  'group-permissions/GET',
  async (payload: { id: string }) => {
    const { id } = payload;
    let data;
    try {
      const response = await axios.get(`/permission-groups/${id}`);
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

export const deleteGroupPermissionById = createAsyncThunk(
  'group-permissions/DELETE',
  async (payload: { id: string }) => {
    const { id } = payload;
    let data;
    try {
      const response = await axios.delete(`/permission-groups/${id}`);
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
export const updateGroupPermission = createAsyncThunk(
  'group-permissions/EDIT',
  async (payload: { id: string; body: object }) => {
    const { id, body } = payload;
    let data;
    try {
      const response = await axios.patch(`/permission-groups/${id}`, body);
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
export const createNewGroupPermission = createAsyncThunk(
  'group-permissions/POST',
  async (payload: { name: string }) => {
    const { name } = payload;
    let data;
    try {
      const response = await axios.post(`/permission-groups`, { name });
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
