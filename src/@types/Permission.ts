export enum ModelCode {
  USER = 'USER',
  PERMISSION = 'PERMISSION',
  PERMISSION_GROUP = 'PERMISSION_GROUP',
  KPI = 'KPI',
  WORKTIME = 'WORKTIME',
  CALLS = 'CALL',
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
