import React, { Dispatch, SetStateAction, useState } from 'react';
import { TextField, MenuItem } from '@mui/material';

import { IFilterStatClientResponse } from '../../../../@types/FilterStatClientResponse';
import AsyncSelectKpis from '../../../../components/AsyncSelect/AsyncSelectKpis';
import { AdminAsyncSelect, StatClientAsyncSelect } from '../../../../components/AsyncSelect';
import { MENU_ITEM_VALUE } from '../../../../constant/menuItemFilter';
import CustomDateRangePicker from '../components/CustomDateRangePicker';
import { valueFilterType } from '../../../../@types/AsyncSelectFilter';
import { dispatch } from '../../../../redux/store';
import { handleChangefilter } from '../../../../redux/slices/statClientResponse';



type IProp = {
  filter: IFilterStatClientResponse;
}

const RenderSelectFilter = ({ filter  }: IProp) => {
  switch (filter.type) {
    case MENU_ITEM_VALUE.admin:
      return (
        <AdminAsyncSelect
        
        name={filter.id} 

        />
      );
    case MENU_ITEM_VALUE.kpis:
      return <AsyncSelectKpis name={filter.id}  />
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
      return <StatClientAsyncSelect   name={filter.id}   />
    case MENU_ITEM_VALUE.range:
      return   <CustomDateRangePicker  name={filter.id}  /> 
    default:
      return (
        <TextField disabled value="select filter type"/>
      );
  }
}

export default RenderSelectFilter;
