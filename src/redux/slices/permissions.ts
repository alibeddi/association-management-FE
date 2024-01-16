import { createSlice } from '@reduxjs/toolkit';
import { Permission } from 'src/@types/Permission';
import { IStatus } from 'src/@types/status';

type PermissionState = {
  permissions: Permission[];
  status: IStatus;
};

const initialState: PermissionState = {
  permissions: [] as Permission[],
  status: IStatus.IDLE,
};

const slice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = slice.actions;
export default slice.reducer;
