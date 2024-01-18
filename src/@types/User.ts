import { Permission } from './Permission';
import { PermissionGroup } from './PermissionGroup';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  permissionGroup: PermissionGroup;
  extraPermission: Permission[];
  deletedAt: Date | null;
}

export type IUserAccountGeneral = {
  id: string;
  avatarUrl: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  company: string;
  isVerified: boolean;
  status: string;
  role: string;
};
