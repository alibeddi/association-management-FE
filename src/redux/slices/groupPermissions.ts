import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PermissionGroup } from 'src/@types/PermissionGroup';
import { IStatus } from 'src/@types/status';
import axios from '../../utils/axios';

//  permissionGroup, permissionGroup
type PermissionState = {
  permissionGroups: PermissionGroup[];
  permissionGroup: PermissionGroup | null;
  status: IStatus;
};

const initialState: PermissionState = {
  permissionGroups: [],
  permissionGroup: null,
  status: IStatus.IDLE,
};

export const getAllPermissionGroups = createAsyncThunk('group-permissions/GETALL', async () => {
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

export const getPermissionGroup = createAsyncThunk(
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

export const deleteGroupPermissionById = createAsyncThunk(
  'group-permissions/DELETE',
  async (payload: { id: string }) => {
    const { id } = payload;
    let data;
    try {
      const response = await axios.delete(`/group-permissions/${id}`);
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
      .addCase(getAllPermissionGroups.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getAllPermissionGroups.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.permissionGroups = action.payload;
      })
      .addCase(getAllPermissionGroups.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // GET ONE
    builder
      .addCase(getPermissionGroup.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(getPermissionGroup.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.permissionGroup = action.payload;
      })
      .addCase(getPermissionGroup.rejected, (state) => {
        state.status = IStatus.FAILED;
      });

    // DELETE
    builder
      .addCase(deleteGroupPermissionById.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(deleteGroupPermissionById.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.permissionGroup = action.payload;
      })
      .addCase(deleteGroupPermissionById.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
