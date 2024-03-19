import { PropsWithChildren } from 'react';
import { MethodCode, ModelCode } from '../@types/Permission';
import { RoleCode } from '../@types/User';
import { findPermission } from '../sections/@dashboard/Permissions/utils';
import { useAuthContext } from './useAuthContext';

type Props = {
  model: ModelCode;
  method: MethodCode;
};
export default function PermissionGuard({ children, model, method }: PropsWithChildren<Props>) {
  const { user } = useAuthContext();
  const isSuperAdmin = user?.role === RoleCode.SUPER_ADMIN;
  const isAllowedToAccessThisPage =
    isSuperAdmin || findPermission(user?.permissionGroup, user?.extraPermissions, model, method);

  if (!isAllowedToAccessThisPage) {
    return <h1>Permission denied</h1>;
  }

  // eslint-disable-next-line consistent-return
  return <> {children} </>;
}
