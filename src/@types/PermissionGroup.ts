import { Permission } from './Permission';

export interface PermissionGroup {
  _id: string;
  name: string;
  permissions: Permission[];
}
