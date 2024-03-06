import { Office } from './Office';
import { Permission } from './Permission';
import { PermissionGroup } from './PermissionGroup';

export interface User {
  _id: string;
  username: string;
  name: string;
  email: string;
  avatar: string;
  office: Office;
  role: RoleCode;
  OAuthToken?: string;
  permissionGroup?: PermissionGroup[];
  extraPermission?: Permission[];
  deletedAt: Date | null;
  createdAt: Date;
}

export const enum RoleCode {
  SUPER_ADMIN = 'SUPER ADMIN',
  ADMIN = 'ADMIN',
}
