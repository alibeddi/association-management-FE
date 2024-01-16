import { Permission } from "./Permission";

export interface PermissionGroup {
  name: string;
  permissions: Permission[];
}
