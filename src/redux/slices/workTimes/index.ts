import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICalendarEvent } from '../../../@types/calendar';
import { Meta, PaginationModel } from '../../../@types/Pagination';
import { IStatus } from '../../../@types/status';
import {getMyCalendarWorkTime,createCalendarWorkTime,deleteCalendarWorkTime,updateCalendarWorkTime} from "./actions";



type WorkTimeState = {
workTimes: PaginationModel<ICalendarEvent>;
workTime: ICalendarEvent;
status: IStatus;
}

const initialState: WorkTimeState = {
  workTimes: {docs: [],meta: {} as Meta},
  workTime: {} as ICalendarEvent,
  status: IStatus.IDLE
}

  const slice = createSlice({
    name: 'workTimes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getMyCalendarWorkTime.pending,(state)=>{
          state.status = IStatus.LOADING;
        })
        .addCase(getMyCalendarWorkTime.fulfilled,(state,action)=>{
          state.status = IStatus.SUCCEEDED;
          state.workTimes = action.payload;
        })
        .addCase(getMyCalendarWorkTime.rejected,(state)=>{
          state.status = IStatus.FAILED;
        })
        .addCase(createCalendarWorkTime.pending, (state) => {
          state.status = IStatus.LOADING;
        })
        .addCase(createCalendarWorkTime.fulfilled, (state, {payload}) => {
          state.status = IStatus.SUCCEEDED;
          const {data} = payload;
          state.workTimes.docs = [...state.workTimes.docs,...data]
        })
        .addCase(createCalendarWorkTime.rejected, (state) => {
          state.status = IStatus.FAILED;
        })
        // updateCalendarWorkTime reducers
        .addCase(updateCalendarWorkTime.pending, (state) => {
          state.status = IStatus.LOADING;
        })
        .addCase(updateCalendarWorkTime.fulfilled, (state, {payload}) => {
          state.status = IStatus.SUCCEEDED;
          const {data:{updatedWorktime}} = payload
          const indexUpdateWorkTime = state.workTimes.docs.findIndex(item => item._id === updatedWorktime._id);
          if(indexUpdateWorkTime!==-1){
            state.workTimes.docs[indexUpdateWorkTime] = updatedWorktime;
          }
        })
        .addCase(updateCalendarWorkTime.rejected, (state,action) => {
          state.status = IStatus.FAILED;
        })
        .addCase(deleteCalendarWorkTime.pending, (state) => {
          state.status = IStatus.LOADING;
        })
        .addCase(deleteCalendarWorkTime.fulfilled, (state, {payload,meta}) => {
          state.status = IStatus.SUCCEEDED;
          const {arg:{id}} = meta;
          state.workTimes.docs = state.workTimes.docs.filter(item=> item._id !== id);
        })
        .addCase(deleteCalendarWorkTime.rejected, (state) => {
          state.status = IStatus.FAILED;
        });
    },
  })

  export const {actions} = slice;
  export default slice.reducer;