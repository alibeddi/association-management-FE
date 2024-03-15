
export interface Params {
  page: number;
  limit: number;
  orderBy?: string;
  name?: string; 
}
export const setParams = (data:Params)=> {
  const {page,limit,name} = data;
  const params:Params = {page,limit};
  if(name && typeof name === "string") params.name = name;
  return params;
}
export const setQuery = (params:Params) =>  `?page=${params.page}&limit=${params.limit}${params.name ? `&search=${params.name}` : ''}`;
