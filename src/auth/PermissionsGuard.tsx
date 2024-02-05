import { PropsWithChildren } from 'react';
import { MethodCode, ModelCode } from '../@types/Permission';
import { hasPermission } from '../sections/@dashboard/Permissions/utils';
import { useAuthContext } from './useAuthContext';

type Props = {
  model: ModelCode;
  method: MethodCode;
};
export default function PermissionGuard({ children, model, method }: PropsWithChildren<Props>) {
  const { user } = useAuthContext();
  const userPermissions = user?.permissionGroup[0].permissions;
  const listGroupPermission = hasPermission(userPermissions, model, method);

  if (!listGroupPermission) {
    return <h1>Permission denied</h1>;
  }

  // eslint-disable-next-line consistent-return
  return <> {children} </>;
}
