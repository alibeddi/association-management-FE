import { Tooltip } from '@mui/material';
import React, { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form';
import { AsyncPaginate } from 'react-select-async-paginate';
import {PaginationModel} from "../../@types/Pagination"
import { useLocales } from '../../locales';
import { dispatch } from '../../redux/store';
import { setParams } from '../../utils/setParams';
import { StyledAsyncPaginate } from '../AsyncSelect/styles';

interface Props<T>  {
  name: string;
  label: string;
  helperText?:React.ReactNode;
  required?: boolean;
  isMulti?: boolean;
  disable?:boolean;
  isSearchable?:boolean;
  placeholder?:string;
  fetchData: (params:Params) => Promise<any>
  getOptionLabel: (option: T) => string;
 getOptionValue: (option: T) => any;
 onChange?: Function;
 sx?: React.CSSProperties;
}
interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  name?: string; 
}
const RHFAsyncSelect = <T,>({
  name,
  label,
  helperText,
  isMulti=false,
  disable=false,
  required=false,
  fetchData,
  placeholder,
  isSearchable=true,
  getOptionLabel,
  getOptionValue,
  sx={},
  onChange:onChangeProp,
  ...other
}:Props<T>) => {
  const {control} = useFormContext()
  const {translate} = useLocales()
  const [page,setPage] = useState<number>(1)
  const [filterName,setFilterName] = useState<string | null>(null)
  const loadOptions = async (searchQuery: string) => {
   
    if(searchQuery){
      setFilterName(searchQuery)
      setPage(0)
    } 
    const params = setParams({page,limit:10,filterName:filterName || ""})
    // const {docs,meta}= await dispatch(fetchData(params))
    const data = await  fetchData(params)
    const {docs,meta} = data.data;
    const hasMore = meta.hasMore;
    setPage(prev => hasMore ?  prev + 1 : page);
    return {
      options: docs,
      hasMore,
      additional: {
        page
      }
    };
  };

  // const handleChange = (e: any) => {
  //   if (onChangeProp) {
  //     onChangeProp(e);
  //   } else {
  //     field.onChange(e);
  //   }
  // };

  return (
    <Controller
    name={name}
    control={control}
    render={({field,fieldState:{error}})=>(
      <Tooltip title={`${translate(helperText)}` || `${translate(label)}` }>
        <AsyncPaginate
         onChange={(e) => {
          if(!e) return;
          if(onChangeProp){
            onChangeProp(e)
          }else{
            field.onChange((e));
          }
          
        }}
        isMulti={isMulti}
        additional={{
          page:1
        }}
        loadOptions={loadOptions}
        getOptionLabel={(option:T)=>getOptionLabel(option)}
        getOptionValue={(option:T)=>getOptionValue(option)}
        isSearchable={isSearchable}
        placeholder={placeholder || "select item"}
        required={required}
        styles={StyledAsyncPaginate(sx)}
        {...other}
      />
      </Tooltip>
    )}
    />
  )
}

export default RHFAsyncSelect
