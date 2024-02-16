import { IStatsClientFormProps } from "../@types/statsClient";

export const setDefaultValuesStatsClient = (statsClient:IStatsClientFormProps | null) => statsClient ?{
  name: statsClient.name,
  kpis: statsClient.kpis
} : {
  name: '',
  kpis: []
};