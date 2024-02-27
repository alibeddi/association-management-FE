export type IAsyncSelectFilter = {
  name:string;
  handleChange: (id: string, value: string) => void,
}
export type IResponseFilter = {
  [key: string]: boolean 
}