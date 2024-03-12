import { Office } from "./offices";
import { Permission } from "./Permission";
import { PermissionGroup } from "./PermissionGroup";

export type IPropsEditUser = {
  userId?:string;
  email?:string;
  name?: string;
  role: string;
  office?:Office;
  permissionGroup?: PermissionGroup[] | string[];
  extraPermission?: Permission[] | string[];

}