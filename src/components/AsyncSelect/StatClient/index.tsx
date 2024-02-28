import { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import {  useDispatch, useSelector } from '../../../redux/store';
import { getAllStatsClient } from '../../../redux/slices/statsClient/action';
import { IStatsClient } from '../../../@types/statsClient';
import { IAsyncSelectFilter } from '../../../@types/AsyncSelectFilter';
import { StyledAsyncPaginate } from '../styles';

interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  filterName?: string; 
}
const StatClient = (({
  handleChange,
  name
}:IAsyncSelectFilter) => {
  const dispatch = useDispatch()
  const [page,setPage] = useState<number>(0)
  const [filterName,setFilterName] = useState<string | null>(null)
  const loadOptions = async (searchQuery: string ) => { 
    if(searchQuery){
      setFilterName(searchQuery)
      setPage(0)
    }
    const params:Params = {page,limit:10};
    if(filterName && typeof filterName === "string") params.filterName = filterName
    const result =  await dispatch(getAllStatsClient(params)).unwrap().then(res=>res.data)
    const hasMore = result.meta.hasMore;
    setPage(prev => hasMore ? prev + 1 : prev);
    return {
      options: result.docs,
      hasMore,
      additional: {
        page
      }
    };
  };
  return (
    <AsyncPaginate
    getOptionLabel={(option:IStatsClient)=>option.name }
    getOptionValue={(option)=>option._id}
    additional={{
      page:1
    }}
    loadOptions={loadOptions}
    isSearchable
    placeholder="Select an stats Clients"
    onChange={(e)=>{if(e) {handleChange(name,e._id);}}}
    styles={StyledAsyncPaginate}
    />
  )
})

export default StatClient
