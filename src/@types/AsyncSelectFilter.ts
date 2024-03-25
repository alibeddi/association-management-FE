import { IKpi } from "./Kpi";

export type DateFilterRange = {
  startDate: Date | null,
  endDate : Date | null
}
export type valueFilterType = string | string[] | DateFilterRange | IKpi;
export type IAsyncSelectFilter = {
  name:string;
}
export type IResponseFilter = {
  [key: string]: boolean 
}