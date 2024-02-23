import { useEffect, useState } from 'react';
import "./_index.scss"
import { AsyncPaginate } from 'react-select-async-paginate';
import { IKpi } from '../../../@types/Kpi';
import { getKpis } from '../../../redux/slices/kpis/actions';
import {  useDispatch, useSelector } from '../../../redux/store';
import { IAsyncSelectFilter } from '../../../@types/AsyncSelectFilter';


interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  filterName?: string;
}

const AsyncSelectKpis = ({
  handleChange,
  name
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
  const [value,setValue] = useState<IKpi[] | IKpi | string | null>(kpis.docs)

  const loadOptions = async (searchQuery: string) => {
    setPage(prev => prev + 1);
    if(searchQuery){
      setFilterName(searchQuery)
      setPage(0)
    }
    return {
      options: kpis.docs,
      hasMore: kpis.meta.hasMore,
      additional: {
        page: kpis.meta.hasMore ? page + 1 : page
      }
    };
  };

  return (
    <AsyncPaginate
    value={value}
    getOptionLabel={(test)=>(test as unknown as IKpi).label}
    getOptionValue={(test)=>(test as unknown as IKpi)._id}
    additional={{
      page:1
    }}
    loadOptions={loadOptions}
    isSearchable
    placeholder="Select an kpis"
    onChange={(e)=>{if(e) handleChange(name,typeof e === "string" ? e : e._id);setValue(e);}}
    />

  )
}

export default AsyncSelectKpis
