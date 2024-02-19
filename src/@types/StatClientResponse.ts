import { IKpi } from './Kpi';
import { User } from './User';

export interface StatClientResponse {
  _id: string;
  statClient: string;
  clientName: string;
  clientContact: string;
  admin: User;
  kpis: Array<{
    kpi: IKpi;
    response: Array<any>;
  }>;
  deletedAt: Date;
  createdAt: Date;
}
