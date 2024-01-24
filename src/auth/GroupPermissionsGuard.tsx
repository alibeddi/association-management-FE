import { PropsWithChildren } from 'react';
import { hasPermission } from 'src/sections/@dashboard/Permissions/utils';
import { useAuthContext } from './useAuthContext';

export default function GroupPermissionGuard({ children }: PropsWithChildren) {
  const { user } = useAuthContext();
  const userPermissions = user?.permissionGroup[0].permissions;
  const listGroupPermission = hasPermission(userPermissions, 'PERMISSION_GROUP', 'LIST');

  if (!listGroupPermission) {
    return <h1>Permission denied</h1>;
  }

  // eslint-disable-next-line consistent-return
  return <> {children} </>;
}
