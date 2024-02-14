import { IKpi } from './Kpi';

export type IStatsClient = {
  _id?: string;
  name: string;
  kpis: IKpi[];
};
