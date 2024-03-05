export type DateFilterRange = {
  startDate: Date | null,
  endDate : Date | null
}
export type valueFilterType = string | string[] | DateFilterRange;
export type IAsyncSelectFilter = {
  name:string;
  handleChange: (id: string, value: valueFilterType) => void,
}
export type IResponseFilter = {
  [key: string]: boolean 
}