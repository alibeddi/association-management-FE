import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';

import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse';
import { MENU_ITEM_VALUE } from '../../../../constant/menuItemFilter';
import CustomDateRangePicker from '../components/CustomDateRangePicker';
import { valueFilterType } from '../../../../@types/AsyncSelectFilter';
import { dispatch } from '../../../../redux/store';
import { handleChangefilter } from '../../../../redux/slices/statClientResponse';
import { IKpi } from '../../../../@types/Kpi';
import axios from '../../../../utils/axios';
import RHFAsyncSelect from '../../../../components/hook-form/RHFAsyncSelect';
import { User } from '../../../../@types/User';
import { IStatsClient } from '../../../../@types/statsClient';



type IProp = {
  filter: IFilterStatClientResponse;
}

const RenderSelectFilter = ({ filter  }: IProp) => {
  switch (filter.type) {
    case MENU_ITEM_VALUE.admin:
      return (
        <RHFAsyncSelect
        name="admin"
        label="admin"
        placeholder='select a admin'
        required
        isMulti
        isSearchable
        getOptionLabel={(option:User)=>option.name || option?.email}
        getOptionValue={(option)=>option._id}
        fetchData={async (params) => {
          const response = await axios.get(`/users?page=${params.page}&limit=${params.limit}&filterName=${params.name}`)
          const data = await response.data;
          return data;
        }}
        onChange={(users:any)=>{
          const userId = users?.map((user:any) => user?._id)
          if(userId){ dispatch(handleChangefilter({id:filter.id,value:userId}))}
        
        }}
        sx={{
          padding: ".5rem 1rem"
        }}
        />
      )
    case MENU_ITEM_VALUE.kpis:
      return (
        <RHFAsyncSelect
        name="kpis"
        label="kpi"
        placeholder='select a kpi'
        required
        isSearchable
        getOptionLabel={(option:IKpi) => option && typeof option !== 'string' ? option?.label : option}
        getOptionValue={(option)=>option}
        fetchData={async (params) => {
          const response = await axios.get(`/kpis?page=${params.page}&limit=${params.limit}&filterName=${params.name}`)
          const data = await response.data;
          return data;
        }}
        onChange={(e:any)=>{if(e) dispatch(handleChangefilter({id:filter.id,value:e}));}}
        sx={{
          padding: ".5rem 1rem"
        }}
        />
      )
    case MENU_ITEM_VALUE.clientContact:
      return <TextField
      
      name={filter.id}
      value={filter.value}
      placeholder="enter client contact"
      onChange={(e)=>dispatch(handleChangefilter({id:filter.id,value:e.target.value}))}
      />
    case MENU_ITEM_VALUE.clientName:
      return  <TextField
      
      name={filter.id}
      value={filter.value}
      placeholder="enter client name"
      onChange={(e)=>dispatch(handleChangefilter({id:filter.id,value:e.target.value}))}
      />
    case MENU_ITEM_VALUE.statClient:
      // return <StatClientAsyncSelect   name={filter.id}   />
      return (
        <RHFAsyncSelect
        name="statClient"
        label="statClient"
        placeholder='select a stat client'
        required
        isSearchable
        getOptionLabel={(option:IStatsClient)=>option.name }
        getOptionValue={(option)=>option._id}
        fetchData={async (params) => {
          const response = await axios.get(`/stat-clients?page=${params.page}&limit=${params.limit}&filterName=${params.name}`)
          const data = await response.data;
          return data;
        }}
        onChange={(e:User)=>{if(e) {dispatch(handleChangefilter({id:filter.id,value:e._id}))}}}
        sx={{
          padding: ".5rem 1rem"
        }}
        />
      )
    case MENU_ITEM_VALUE.range:
      return   <CustomDateRangePicker  name={filter.id}  /> 
    default:
      return (
        <TextField disabled value="select filter type"/>
      );
  }
}

export default RenderSelectFilter;
