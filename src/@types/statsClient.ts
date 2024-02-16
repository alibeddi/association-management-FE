import { IKpi } from "./Kpi";

export type IStatsClient = {
  _id:string;
  name: string;
  kpis: IKpi[];
}
export type IStatsClients = {
  _id:string;
  name: string;
  kpis: string[];
}
export type IStatsClientFormProps = {
  name: string;
  kpis: IKpi[] | [];
}