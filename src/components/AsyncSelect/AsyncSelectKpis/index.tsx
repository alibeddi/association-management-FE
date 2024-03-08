import { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { styled } from '@mui/material/styles';
import { IKpi } from '../../../@types/Kpi';
import { getKpis } from '../../../redux/slices/kpis/actions';
import {  useDispatch } from '../../../redux/store';
import { IAsyncSelectFilter } from '../../../@types/AsyncSelectFilter';
import { StyledAsyncPaginate } from '../styles';
import { setParams } from '../../../utils/setParams';
import { handleChangefilter } from '../../../redux/slices/statClientResponse';


interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  filterName?: string;
}

const AsyncSelectKpis = ({
  name,
}:IAsyncSelectFilter) => {
  const dispatch = useDispatch()
  const [page,setPage] = useState<number>(0)
  const [filterName,setFilterName] = useState<string | null>(null)
  const loadOptions = async (searchQuery: string) => {
    
    if(searchQuery){
      setFilterName(searchQuery)
      setPage(0)
    }
    const params = setParams({page,limit:10,filterName:searchQuery})
    const results = await dispatch(getKpis(params)).unwrap().then(res=>res)
    const hasMore = results.meta.hasMore;
    setPage(prev => hasMore ? prev + 1 : prev);
    return {
      options: results.docs,
      hasMore,
      additional: {
        page
      }
    };
  };
   
  return (
    <AsyncPaginate
    getOptionLabel={(option:IKpi)=>(option.name)}
    getOptionValue={(option)=>(option._id)}
    additional={{
      page:1
    }}
    loadOptions={loadOptions}
    isSearchable
    placeholder="Select an kpis"
    onChange={(e)=>{if(e) dispatch(handleChangefilter({id:name,value:e}));}}
    styles={StyledAsyncPaginate()}
    />
  )
}

export default AsyncSelectKpis
