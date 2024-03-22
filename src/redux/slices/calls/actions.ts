import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICall } from "../../../@types/Call";
import { fDate } from "../../../utils";
import axios from "../../../utils/axios";

export const  getMyCalls = createAsyncThunk('/calls/me',async () => {
  let data;
  try {
    const response = await axios.get('/calls/me');
    data = await response.data;
    if(response.status === 200 ){
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message: data?.message);
  }
})
export const createCallsToday = createAsyncThunk('/calls/create',async (newCall:ICall) => {
  let data;
  try {
    console.log("new call",newCall);
    const response = await axios.post('/calls',newCall);
    data = await response.data;
    if(response.status === 200){
      return data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message: data.message)
  }
})
export const updateCall = createAsyncThunk('/calls/update',async ({newCall}:{newCall:ICall}) => {
  let data;
  try {
    const response = await axios.patch(`/calls/${newCall._id}`,{
      date:newCall.date,
      calls:newCall.calls
    });
    data = response.data;
    if(response.status === 200){
      return data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data.message)
  }
})
export const getCallByDate = createAsyncThunk('/calls/date',async ({date}:{date:Date | string}) => {
  let data;
  try {
    const response = await axios.get(`/calls/date?date=${date}`);
    data = response.data;
    if(response.status === 200){
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data.message)
  }
})
export const getCallById = createAsyncThunk('/calls/id',async({id}:{id:string})=>{
  let data;
  try {

    const response = await axios.get(`/calls/${id}`);
    data = response.data;
    if(response.status === 200){
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (error) {
    return Promise.reject(error.message ? error.message : data.message)
  }
})