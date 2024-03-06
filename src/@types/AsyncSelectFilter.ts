export type DateFilterRange = {
  startDate: Date | null,
  endDate : Date | null
}
export type valueFilterType = string | string[] | DateFilterRange;
export type IAsyncSelectFilter = {
  name:string;
}
export type IResponseFilter = {
  [key: string]: boolean 
}