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

export const getAllGroupPermissions = createAsyncThunk('group-permissions/GETALL', async () => {
  let data;
  try {
    const response = await axios.get(`/group-permissions`);
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});

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
  name: 'permissions_groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(getAllGroupPermissions.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getAllGroupPermissions.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.groupPermissions = action.payload;
      })
      .addCase(getAllGroupPermissions.rejected, (state, action) => {
        state.status = IStatus.FAILED;
      });
    // GET ONE
    builder
      .addCase(getGroupPermission.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getGroupPermission.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.groupPermission = action.payload;
      })
      .addCase(getGroupPermission.rejected, (state, action) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
