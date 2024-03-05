export type IAsyncSelectFilter = {
  name:string;
  handleChange: (id: string, value: string | string[]) => void,
}
export type IResponseFilter = {
  [key: string]: boolean 
}