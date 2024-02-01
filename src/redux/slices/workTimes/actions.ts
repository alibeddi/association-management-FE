import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICalendarEvent } from 'src/@types/calendar';
import { splitIntervalIntoHours } from 'src/utils';
import axios from '../../../utils/axios';

export const getMyCalendarWorkTime = createAsyncThunk('workTimes/GETALL',async ()=>{
  let data;
  try {
    const response = await axios.get('/worktimes/my-worktime');
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
    const response = await axios.get(`/worktimes/${id}`);
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
const {startDate,endDate} = payload;
try {
  const splitHours = splitIntervalIntoHours({startDate,endDate} );
  const response  = await axios.post('/worktimes',{
    data: splitHours
  });
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
async({id,body}:{id:string,body:ICalendarEvent})=>{
let data;
try {
  const response = await axios.patch(`/worktimes/${id}`,body);
  console.log({response});
  data = await response.data;
  if(response.status === 200){
    return data;
  }
  throw new Error(response.data);
} catch (err) {
  console.error("error : ",err.message)
  throw new  Error(err.message ? err.message : data?.message);
}



})
export const deleteCalendarWorkTime = createAsyncThunk('workTimes/delete',async(payload:{id:string})=>{
  const {id} = payload;
  let data;
  try {
    const response = await axios.delete(`/worktimes/`,{
      data: {
        data: [id]
      }
    });
    data = await response.data;
    if(response.status === 200){
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data?.message);
  
  }
  
  
  
  })

