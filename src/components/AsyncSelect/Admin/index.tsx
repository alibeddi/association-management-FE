import { useEffect, useState } from 'react';
import "./_index.scss"
import { AsyncPaginate } from 'react-select-async-paginate';
import {  useDispatch, useSelector } from '../../../redux/store';
import { getUsers } from '../../../redux/slices/users/actions';
import { User } from '../../../@types/User';

interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  name?: string; 
}
const Admin = (({
  handleChange,
  name
}:any) => {
  const dispatch = useDispatch()
  const [page,setPage] = useState<number>(0)
  const [filterName,setFilterName] = useState(undefined)
  useEffect(()=>{
    const params:Params = {page,limit:10};
    if(filterName && typeof filterName === "string") params.name = filterName
    dispatch(getUsers(params))
  },[dispatch,page,filterName])
  const {users} = useSelector(store=>store.users)
  const [value,setValue] = useState<User[] | User | null>(users.docs)
  const loadOptions = async (searchQuery: any, loadedOptions: any, { page:pageIndex }: any) => {
    setPage(prev => prev + 1);
    if(searchQuery){
      setFilterName(searchQuery)
      setPage(0)
    }
    return {
      options: users.docs,
      hasMore: users.meta.hasMore,
      additional: {
        page: pageIndex + 1
      }
    };
  };
  return (
    <AsyncPaginate
    value={value}
    getOptionLabel={(option)=>option.name || option?.email}
    getOptionValue={(option)=>option._id}
    additional={{
      page:1
    }}
    loadOptions={loadOptions}
    isSearchable
    placeholder="Select an users"
    onChange={(e)=>{handleChange(name,e);setValue(e)}}
    />
  )
})

export default Admin
