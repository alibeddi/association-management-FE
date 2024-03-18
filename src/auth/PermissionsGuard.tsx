import { PropsWithChildren } from 'react';
import { MethodCode, ModelCode } from '../@types/Permission';
import { findPermission } from '../sections/@dashboard/Permissions/utils';
import { useAuthContext } from './useAuthContext';

type Props = {
  model: ModelCode;
  method: MethodCode;
};
export default function PermissionGuard({ children, model, method }: PropsWithChildren<Props>) {
  const { user } = useAuthContext();
  const isAllowedToAccessThisPage = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    model,
    method
  );

  if (!isAllowedToAccessThisPage) {
    return <h1>Permission denied</h1>;
  }

  // eslint-disable-next-line consistent-return
  return <> {children} </>;
}
