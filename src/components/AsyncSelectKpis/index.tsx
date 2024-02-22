import { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { IKpi } from '../../@types/Kpi';
import { getKpis } from '../../redux/slices/kpis/actions';
import {  useDispatch, useSelector } from '../../redux/store';


interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  filterName?: string; // Define filterName as optional
}

const AsyncSelectKpis = ({
  handleChange,
  name
}:any) => {
  const dispatch = useDispatch()
  const [page,setPage] = useState<number>(0)
  const [filterName,setFilterName] = useState(undefined)
  useEffect(()=>{
    const params:Params = {page,limit:10,orderBy:"name"};
    if(filterName && typeof filterName === "string") params.filterName = filterName
    dispatch(getKpis(params))
  },[dispatch,page,filterName])
  const {kpis} = useSelector(store=>store.kpis)
  const [value,setValue] = useState<IKpi[] | IKpi | null>(kpis.docs)

  const loadOptions = async (searchQuery: any, loadedOptions: any, { page:pageIndex }: any) => {
    setPage(prev => prev + 1);

    console.log("loadOptions : ",searchQuery,"test",loadedOptions,page)
    if(searchQuery){
      setFilterName(searchQuery)
      setPage(0)
    }
    return {
      options: kpis.docs,
      hasMore: kpis.meta.hasMore,
      additional: {
        page: pageIndex + 1
      }
    };
  };

  return (
    <AsyncPaginate

    value={value}
    getOptionLabel={(option)=>option.name}
    getOptionValue={(option)=>option._id}
    additional={{
      page:1
    }}
    loadOptions={loadOptions}
    isSearchable
    placeholder="Select an kpis"
    onChange={(e)=>{handleChange(name,e);setValue(e)}}
    />

  )
}

export default AsyncSelectKpis
