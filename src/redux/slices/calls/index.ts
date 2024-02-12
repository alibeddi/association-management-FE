import { createSlice } from "@reduxjs/toolkit";
import { ICall } from "../../../@types/Call"
import { Meta, PaginationModel } from "../../../@types/Pagination"
import { IStatus } from "../../../@types/status";
import { createCallsToday, getCallByDate, getMyCalls,updateCall } from "./actions";

type CallsState = {
  calls: PaginationModel<ICall>;
  call: ICall;
  status: IStatus;
}

const initialState: CallsState ={
  calls: {docs: [],meta: {} as Meta},
  call: {} as ICall,
  status: IStatus.IDLE
}
const slice = createSlice({
  name:"calls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getMyCalls.pending,(state)=>{
      state.status = IStatus.LOADING;
    })
    .addCase(getMyCalls.fulfilled,(state,{payload})=>{
      state.status = IStatus.SUCCEEDED;
      state.calls = payload;
    })
    .addCase(getMyCalls.rejected,(state)=>{
      state.status = IStatus.FAILED;
    })
    .addCase(createCallsToday.pending,(state)=>{
      state.status = IStatus.LOADING;
    })
    .addCase(createCallsToday.fulfilled,(state,{payload})=>{
      state.status = IStatus.SUCCEEDED;
      state.calls.docs = [...state.calls.docs,payload.data]
      state.call = {...payload.data};
    })
    .addCase(createCallsToday.rejected,(state)=>{
      state.status = IStatus.FAILED;
    })
    .addCase(getCallByDate.pending,(state)=>{
      state.status = IStatus.LOADING;
    })
    .addCase(getCallByDate.fulfilled,(state,{payload})=>{
      state.status = IStatus.SUCCEEDED;
      state.call = payload;
    })
    .addCase(getCallByDate.rejected,(state)=>{
      state.status = IStatus.FAILED;
    })
    .addCase(updateCall.pending,(state)=>{
      state.status = IStatus.LOADING;
    })
    .addCase(updateCall.fulfilled, (state, { payload }) => {
      state.status = IStatus.SUCCEEDED;
      state.calls.docs = state.calls.docs.map(call=>call._id!==payload.data._id?call:payload.data)
    })
    .addCase(updateCall.rejected,(state)=>{
      state.status = IStatus.FAILED;
    })
  }
})
export const  {actions} = slice;
export default slice.reducer;