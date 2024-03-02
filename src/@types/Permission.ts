export enum ModelCode {
  USER = 'USER',
  PERMISSION = 'PERMISSION',
  PERMISSION_GROUP = 'PERMISSION_GROUP',
  KPI = 'KPI',
  WORKTIME = 'WORKTIME',
  CALLS = 'CALL',
  MY_WORKTIME = 'MY_WORKTIME',
  STAT_CLIENT = 'STAT_CLIENT',
  STAT_CLIENT_RESPONSE = 'STAT_CLIENT_RESPONSE',
}

export enum MethodCode {
  CREATE = 'CREATE',
  LIST = 'LIST',
  VIEW = 'VIEW',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

export interface Permission {
  _id: string;
  model: string;
  method: string;
  deletedAt?: Date;
}
