import { IKpi } from './Kpi';
import { User } from './User';

export interface StatClientResponse {
  _id: string;
  statClientId: string;
  clientName: string;
  admin: User;
  kpis: Array<{
    kpi: IKpi;
    response: Array<any>;
  }>;
  deletedAt: Date;
  createdAt: Date;
}
