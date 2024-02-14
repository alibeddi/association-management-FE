import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetAll } from "../../../@types/api";
import { IStatsClient } from "../../../@types/statsClient";
import axios from "../../../utils/axios";

const STAT_CLIENT_URI = "stat-clients"

interface GetAllProps extends IGetAll {
  filterName?: string;
}

export const getAllStatsClient = createAsyncThunk('/statsClient/',async(payload:GetAllProps)=>{
  let data;
  const { page, order, orderBy,filterName,  limit } = payload;
  const params = {
    page:page+1,
    limit,
    sort: order === "desc" ? `-${orderBy}` : `+${orderBy}`, 
    ...(filterName ? {name: filterName} : {} )
  }
  try {
    const response = await axios.get(`/${STAT_CLIENT_URI}`,{params})
    data = await response.data;
    if(response.status===200) return data;
    throw new Error(response.statusText)
  } catch (error) {
    return Promise.reject(error.message ? error.message : data?.message)
  }
})
export const createStatsClient = createAsyncThunk('/statsClient/new',async (newStatsClient:Partial<IStatsClient>) =>{
  let data;
  try {
    const response = await axios.post(`/${STAT_CLIENT_URI}`,newStatsClient)
    data = await response.data;
    if(response.status===200){
      return data;
    }
    throw new Error(response.statusText)
  } catch (error) {
    return Promise.reject(error.message ?? data?.message)
  }
})
export const getSingleStatsClient = createAsyncThunk('/statsClient/single',async ({id}:{id:string})=>{ 
  let data;
  try {
    const response = await axios.get(`/${STAT_CLIENT_URI}/${id}`)
    data = await response.data;
    if(response.status===200){
      return data;
    }
    throw new Error(response.statusText)
  } catch (error) {
    return Promise.reject(error.message ?? data?.message)
  }
})
export const deleteStatsClient = createAsyncThunk('/statsClient/delete',async () => {
  
})