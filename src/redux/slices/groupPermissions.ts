import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../@types/Pagination';
import { PermissionGroup } from '../../@types/PermissionGroup';
import { IStatus } from '../../@types/status';
import axios from '../../utils/axios';

type PermissionState = {
  permissionGroups: PaginationModel<PermissionGroup>;
  permissionGroup: PermissionGroup;
  status: IStatus;
};

const initialState: PermissionState = {
  permissionGroups: { docs: [], meta: {} as Meta },
  permissionGroup: {} as PermissionGroup,
  status: IStatus.IDLE,
};

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
        state.permissionGroups.docs = state.permissionGroups.docs.filter(
          (group) => group._id !== action.meta.arg.id
        );
      })
      .addCase(deleteGroupPermissionById.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // CREATE
    builder
      .addCase(createNewGroupPermission.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(createNewGroupPermission.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.permissionGroup = action.payload.data;
        state.permissionGroups.docs = [action.payload.data, ...state.permissionGroups.docs];
      })
      .addCase(createNewGroupPermission.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
    // EDIT
    builder
      .addCase(updateGroupPermission.pending, (state) => {
        state.status = IStatus.LOADING;
      })
      .addCase(updateGroupPermission.fulfilled, (state, action) => {
        state.status = IStatus.SUCCEEDED;
        state.permissionGroup = action.payload.data;
        state.permissionGroups.docs = state.permissionGroups.docs.map((group) =>
          group._id === action.payload.data._id ? action.payload.data : group
        );
      })
      .addCase(updateGroupPermission.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
