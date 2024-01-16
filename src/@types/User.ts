import { Permission } from "./Permission";
import { PermissionGroup } from "./PermissionGroup";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  permissionGroup: PermissionGroup;
  extraPermission: Permission[];
  deletedAt: Date | null;
  correctPassword(candidatePassword: string, clientPassword: string): Promise<Boolean>;
}
