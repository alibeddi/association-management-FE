import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICalendarEvent } from 'src/@types/calendar';
import axios from '../../../utils/axios';

export const getMyCalendarWorkTime = createAsyncThunk('workTimes/GETALL',async ()=>{
  let data;
  try {
    const response = await axios.get('/worktime/mycalendar');
    data = await response.data;
    if(response.status===200){
      return data.data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  }
})
export const getSingleWorktime = createAsyncThunk('workTimes/single',async(payload:{id:string})=>{
  let data;
  try {
    const {id} =payload;
    const response = await axios.get(`/workTimes/${id}`);
    data = response?.data;
    if(response.status===200){
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);

  }
})
export const createCalendarWorkTime = createAsyncThunk("workTimes/create",
async (
payload:ICalendarEvent
)=>{
let data;
try {
  const response  = await axios.post('/worktime',payload);
  data = await  response?.data;
  if(response.status===200){
    return data;
  }
  throw new Error(response.statusText);
} catch (err) {
  return Promise.reject(err.message ? err.message : data?.message);
}

});
export const updateCalendarWorkTime = createAsyncThunk('workTimes/update',
async({id,body}:{id:string,body:Partial<ICalendarEvent>})=>{

let data;
try {
  const response = await axios.patch(`/worktime/${id}`,body);
  data = await response.data;
  if(response.status === 200){
    return data;
  }
  throw new Error(response.statusText);
} catch (err) {
  return Promise.reject(err.message ? err.message : data?.message);

}



})
export const deleteCalendarWorkTime = createAsyncThunk('workTimes/delete',async(payload:{id:string})=>{
  const {id} = payload;
  let data;
  try {
    const response = await axios.delete(`/worktime/${id}`);
    data = await response.data;
    if(response.status === 200){
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  
  }
  
  
  
  })

