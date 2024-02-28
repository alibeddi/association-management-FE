import { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import {  useDispatch, useSelector } from '../../../redux/store';
import { getUsers } from '../../../redux/slices/users/actions';
import { User } from '../../../@types/User';
import { IAsyncSelectFilter } from '../../../@types/AsyncSelectFilter';
import { StyledAsyncPaginate } from '../styles';

interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  name?: string; 
}
const Admin = (({
  handleChange,
  name
}:IAsyncSelectFilter) => {
  const dispatch = useDispatch()
  const [page,setPage] = useState<number>(0)
  const [filterName,setFilterName] = useState<string | null>(null)
  useEffect(()=>{
    const params:Params = {page,limit:10};
    if(filterName && typeof filterName === "string") params.name = filterName
    dispatch(getUsers(params))
  },[dispatch,page,filterName])
  const {users} = useSelector(store=>store.users)
  const [value,setValue] = useState<User[] >(users.docs)
  const loadOptions = async (searchQuery: string) => {
    const hasMore = users.meta.hasMore;
    setPage(prev => hasMore ?  prev + 1 : page);
    if(searchQuery){
      setFilterName(searchQuery)
      setPage(0)
    } 
    const newOptions = [...users.docs];

    return {
      options: newOptions,
      hasMore,
      additional: {
        page
      }
    };
  };
  return (
    <AsyncPaginate
    getOptionLabel={(option)=>option.name || option?.email}
    getOptionValue={(option)=>option._id}
    additional={{
      page:1
    }}
    loadOptions={loadOptions}
    isSearchable
    placeholder="Select an users"
    onChange={(e)=>{
      if(e){ handleChange(name,e._id);}
    }}
    styles={StyledAsyncPaginate}
    />
  )
})

export default Admin
