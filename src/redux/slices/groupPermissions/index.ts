import { createSlice } from '@reduxjs/toolkit';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { PermissionGroup } from '../../../@types/PermissionGroup';
import { IStatus } from '../../../@types/status';
import {
  createNewGroupPermission,
  deleteGroupPermissionById,
  getAllPermissionGroups,
  getPermissionGroup,
  updateGroupPermission
} from './actions';

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
          (group: PermissionGroup) => group._id !== action.meta.arg.id
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
        state.permissionGroups.docs = state.permissionGroups.docs.map((group: PermissionGroup) =>
          group._id === action.payload.data._id ? action.payload.data : group
        );
      })
      .addCase(updateGroupPermission.rejected, (state) => {
        state.status = IStatus.FAILED;
      });
  },
});

export default slice.reducer;
