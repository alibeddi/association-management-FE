import { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { styled } from '@mui/material/styles';
import { IKpi } from '../../../@types/Kpi';
import { getKpis } from '../../../redux/slices/kpis/actions';
import {  useDispatch, useSelector } from '../../../redux/store';
import { IAsyncSelectFilter } from '../../../@types/AsyncSelectFilter';
import { StyledAsyncPaginate } from '../styles';


interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  filterName?: string;
}

const AsyncSelectKpis = ({
  handleChange,
  name,
}:IAsyncSelectFilter) => {
  const dispatch = useDispatch()
  const [page,setPage] = useState<number>(0)
  const [filterName,setFilterName] = useState<string | null>(null)
  useEffect(()=>{
    const params:Params = {page,limit:10,orderBy:"name"};
    if(filterName && typeof filterName === "string") params.filterName = filterName
    dispatch(getKpis(params))
  },[dispatch,page,filterName])
  const {kpis} = useSelector(store=>store.kpis)
  const [value,setValue] = useState<IKpi[]>(kpis.docs)

  const loadOptions = async (searchQuery: string) => {
    const hasMore = kpis.meta.hasMore;
    setPage(prev => hasMore ? prev + 1 : prev);
    if(searchQuery){
      setFilterName(searchQuery)
      setPage(0)
    }
      setValue([...value,...kpis.docs])

    return {
      options: value,
      hasMore,
      additional: {
        page
      }
    };
  };
   
  return (
    <AsyncPaginate
    getOptionLabel={(option)=>(option.name)}
    getOptionValue={(option:IKpi)=>(option._id)}
    additional={{
      page:1
    }}
    loadOptions={loadOptions}
    isSearchable
    placeholder="Select an kpis"
    onChange={(e)=>{if(e) handleChange(name,e._id);}}
    styles={StyledAsyncPaginate}
    />
  )
}

export default AsyncSelectKpis
