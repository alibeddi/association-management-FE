import { IResponseFilter } from "./AsyncSelectFilter"

export type IFilterStatClientResponse = {
  id:string;
  type:string;
  value:string;
  choices?:IResponseFilter 
}
