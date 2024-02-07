import { Permission } from './Permission';
import { PermissionGroup } from './PermissionGroup';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date | null;
}

export type IUserAccountGeneral = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;

};
