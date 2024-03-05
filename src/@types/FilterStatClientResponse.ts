import { DateFilterRange, IResponseFilter, valueFilterType } from "./AsyncSelectFilter"

export type IFilterStatClientResponse = {
  id:string;
  type:string;
  value:valueFilterType;
  choices?:IResponseFilter 
}
