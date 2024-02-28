
interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  filterName?: string; 
}
export const setParams = (data:Params)=> {
  const {page,limit,filterName} = data;
  const params:Params = {page,limit};
  if(filterName && typeof filterName === "string") params.filterName = filterName;
  return params;
}