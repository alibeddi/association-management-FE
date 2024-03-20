import { createAsyncThunk } from '@reduxjs/toolkit';
import { IPropsEditUser } from '../../../@types/editUser';
import { formatDataEditUser } from '../../../utils';
import axios from '../../../utils/axios';

export const getUsers = createAsyncThunk(
  'users/GETALL',
  async (body: { page: number; limit?: number; search?: string }) => {
    let data;
    const { page, limit, search } = body;
    try {
      const response = await axios.get(`/users`, {
        params: {
          page: page + 1,
          limit,
          ...(search ? { search } : {}),
        },
      });
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

export const getUser = createAsyncThunk('users/GETONE', async ({ id }: { id: string }) => {
  let data;
  try {
    const response = await axios.get(`/users/${id}`);
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

export const editUser = createAsyncThunk('users/EDIT', async (payload: IPropsEditUser) => {
  let data;
  try {
    payload = formatDataEditUser(payload);
    const response = await axios.patch(`/users/${payload.userId}`, {
      office: payload.office?._id,
      role: payload.role,
      permissionGroup: payload.permissionGroup,
      extraPermissions: payload.extraPermissions,
    });
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

// DELETE ONE
export const deleteOne = createAsyncThunk('users/DELETE', async (payload: { userId: string }) => {
  let data;
  const { userId } = payload;
  try {
    const response = await axios.delete(`users/${userId}`);
    data = response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
