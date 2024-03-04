import { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import {  useDispatch, useSelector } from '../../../redux/store';
import { getUsers } from '../../../redux/slices/users/actions';
import { User } from '../../../@types/User';
import { IAsyncSelectFilter } from '../../../@types/AsyncSelectFilter';
import { StyledAsyncPaginate } from '../styles';
import { setParams } from '../../../utils/setParams';

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
  const loadOptions = async (searchQuery: string) => {
   
    if(searchQuery){
      setFilterName(searchQuery)
      setPage(0)
    } 
    const params = setParams({page,limit:10,filterName:searchQuery})
    const {docs,meta}= await dispatch(getUsers(params)).unwrap().then(res=>res)
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
  return (
    <AsyncPaginate
    getOptionLabel={(option:User)=>option.name || option?.email}
    getOptionValue={(option)=>option._id}
    isMulti
    additional={{
      page:1
    }}
    loadOptions={loadOptions}
    isSearchable
    placeholder="Select an users"
    onChange={(users)=>{
      const userId = users.map((user) => user?._id)
      if(userId){ handleChange(name,userId);}
    
    }}
    styles={StyledAsyncPaginate}
    />
  )
})

export default Admin
