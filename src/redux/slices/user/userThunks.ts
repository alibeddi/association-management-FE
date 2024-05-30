import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../../utils/axios';

const baseUrl = import.meta.env.VITE_HOST_API || 'https://api.semrush.universalbox.xyz';

export const fetchUserById = createAsyncThunk('users/fetchUser', async ({ id }: { id: string }) => {
  const access = sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(`${baseUrl}/api/v1/users/${id}/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
});
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const access = sessionStorage.getItem('accessToken');

  try {
    const response = await axios.get(`${baseUrl}/api/v1/users/all`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
});
export const createNewUser: any = createAsyncThunk('users/createUser', async (data: []) => {
  try {
    // const organization = sessionStorage.getItem('organization');

    const response = await axios.post(`${baseUrl}/api/v1/users/create`, { ...data });

    if (response.request.status === 201) return response.data;

    // If the status is not 201, return undefined
    return response.data;
  } catch (error) {
    return error;
  }
});

export const updatePost: any = createAsyncThunk(
  'post/updatePost',
  // eslint-disable-next-line consistent-return
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    // const organization = sessionStorage.getItem('organization');

    try {
      const response = await axios.patch(`${baseUrl}/api/v1/posts/${id}`, { ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const deletePost: any = createAsyncThunk('users/deleteAdmin', async (id) => {
  try {
    // const organization = sessionStorage.getItem('organization');

    const response = await axios.delete(`${baseUrl}/api/v1/posts/${id}/`, {});

    return response.data;
  } catch (error) {
    return error;
  }
});
