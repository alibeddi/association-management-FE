import { IResponseFilter } from "./AsyncSelectFilter"

export type IFilterStatClientResponse = {
  id:string;
  type:string;
  value:string | string[];
  choices?:IResponseFilter 
}
