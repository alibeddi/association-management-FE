import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../../utils/axios';

const baseUrl = import.meta.env.VITE_HOST_API || 'https://api.semrush.universalbox.xyz';

export const fetchMe = createAsyncThunk('user/fetchMe', async () => {
  const access = sessionStorage.getItem('access');

  try {
    const response = await axios.get(`${baseUrl}/api/v1/profile/me/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    });;

    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
});
