import { Permission } from 'src/@types/Permission';

export function hasPermission(userPermissions: Permission[], model: string, method: string) {
  return userPermissions.some(
    (permission) => permission.model === model && permission.method === method
  );
}
