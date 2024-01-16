import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PermissionGroup } from 'src/@types/PermissionGroup';
import { IStatus } from 'src/@types/status';
import axios from '../../utils/axios';

type PermissionState = {
  groupPermissions: PermissionGroup[];
  groupPermission: PermissionGroup | null;
  status: IStatus;
};

const initialState: PermissionState = {
  groupPermissions: [],
  groupPermission: null,
  status: IStatus.IDLE,
};


export const getGroupPermission = createAsyncThunk(
  'group-permissions/GET',
  async (payload: { id: string }) => {
    const { id } = payload;
    let data;
    try {
      const response = await axios.get(`/group-permissions/${id}`);
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

const slice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
