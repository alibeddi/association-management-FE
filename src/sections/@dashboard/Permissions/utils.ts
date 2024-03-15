import { Permission } from '../../../@types/Permission';
import { PermissionGroup } from '../../../@types/PermissionGroup';

export function findPermission(
  permissionGroups: PermissionGroup[],
  extraPermissions: Permission[],
  model: string,
  method: string
): boolean {
  const allPermissions = permissionGroups
    .flatMap((group) => group.permissions)
    .concat(extraPermissions);

  return allPermissions.some(
    (permission) => permission.model === model && permission.method === method
  );
}
