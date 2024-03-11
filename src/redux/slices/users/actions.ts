import { createAsyncThunk } from '@reduxjs/toolkit';
import { Office } from '../../../@types/offices';
import { Permission } from '../../../@types/Permission';
import { PermissionGroup } from '../../../@types/PermissionGroup';
import axios from '../../../utils/axios';

export type IPropsEditUser = {
  userId?:string;
  email?:string;
  name?: string;
  role: string;
  office?:Office;
  permissionGroup?: PermissionGroup[] | string[];
  extraPermission?: Permission[];

}

export const getUsers = createAsyncThunk(
  'users/GETALL',
  async (body: { page: number; limit?: number; search?: string }) => {
    let data;
    const { page, limit, search } = body;
    try {
      const response = await axios.get(`/users`, {
        params: {
          page: page + 1,
          limit,
          ...(search ? { search } : {}),
        },
      });
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

export const getUser  = createAsyncThunk('users/GETONE',async ({id}:{id:string})=>{
  let data;
  try {
    const response = await axios.get(`/users/${id}`);
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
})

export const editUser = createAsyncThunk('users/EDIT',async (payload:IPropsEditUser) => {
  let data;
  try {
    payload.permissionGroup = payload.permissionGroup?.map(elt=> typeof elt !== "string" ?  elt._id : elt)
    const response = await axios.patch(`/users/${payload.userId}`,{
      office:payload.office?._id,permissionGroup:payload.permissionGroup
    });
    data = await response.data;
    if (response.status === 200) {
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
})

// DELETE ONE
export const deleteOne = createAsyncThunk('users/DELETE', async (payload: { userId: string }) => {
  let data;
  const { userId } = payload;
  try {
    const response = await axios.delete(`users/${userId}`);
    data = response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
});
