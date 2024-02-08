import { Permission } from './Permission';
import { PermissionGroup } from './PermissionGroup';

export interface User {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  office: Office;
  createdAt: Date | null;
}

export interface Office {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  office: object;
  createdAt: Date | null;
}

export type IUserAccountGeneral = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};
