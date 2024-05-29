import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../../utils/axios';

const baseUrl = import.meta.env.VITE_HOST_API ;

export const fetchPosts = createAsyncThunk('post/fetchPost', async () => {
  try {
    const accessToken = sessionStorage.getItem('accessToken');
    const response = await axios.get(`${baseUrl}/api/v1/posts/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.docs;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
});


export const createNewPost: any = createAsyncThunk('post/createPost', async (data: []) => {
  try {
    // const organization = sessionStorage.getItem('organization');

    const response = await axios.post(`${baseUrl}/api/v1/posts`, { ...data });

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
console.log(id,'helooo mf');

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
