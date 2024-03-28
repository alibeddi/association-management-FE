import { MethodCode, ModelCode } from '../../@types/Permission';
import { useAuthContext } from '../../auth/useAuthContext';
import { findPermission } from '../../sections/@dashboard/Permissions/utils';

const CallPermissions = () => {
  const { user } = useAuthContext();
  const hasPermissionViewCall = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.CALLS,
    MethodCode.VIEW
  );
  const hasPermissionUpdateCall = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.CALLS,
    MethodCode.EDIT
  );
  const hasPermissionDeleteCall = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.CALLS,
    MethodCode.DELETE
  );
  const hasPermissionListCall = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.CALLS,
    MethodCode.LIST
  );
  const hasPermissionCreateCall = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.CALLS,
    MethodCode.CREATE
  );
  return {
    hasPermissionViewCall,
    hasPermissionUpdateCall,
    hasPermissionDeleteCall,
    hasPermissionListCall,
    hasPermissionCreateCall,
  }
}

export default CallPermissions




