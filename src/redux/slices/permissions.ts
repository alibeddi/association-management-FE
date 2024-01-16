import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Permission } from 'src/@types/Permission';
import { IStatus } from 'src/@types/status';
import axios from '../../utils/axios';

type PermissionState = {
  permissions: Permission[];
  status: IStatus;
};

const initialState: PermissionState = {
  permissions: [] as Permission[],
  status: IStatus.IDLE,
};

export const getPermissions = createAsyncThunk('permissions/GETALL', async () => {
  let data;
  try {
    const response = await axios.get(`/permissions`);
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

const slice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
