import React from 'react';
import { MethodCode, ModelCode } from '../@types/Permission';
import { RoleCode } from '../@types/User';
import { useAuthContext } from '../auth/useAuthContext';
import { findPermission } from '../sections/@dashboard/Permissions/utils';

const usePermission = () => {
  const { user } = useAuthContext();
  const isSuperAdmin = user?.role === RoleCode.SUPER_ADMIN;
  // calendar
  const hasPermissionCreateCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.MY_WORKTIME,
    MethodCode.CREATE
  );
  const hasPermissionUpdateCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.MY_WORKTIME,
    MethodCode.EDIT
  );
  const hasPermissionDeleteCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.MY_WORKTIME,
    MethodCode.DELETE
  );

  // PERMISSION FOR USER CALENDAR
  const hasPermissionEditUserCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.WORKTIME,
    MethodCode.EDIT
  );
  const hasPermissionViewUserCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.WORKTIME,
    MethodCode.VIEW
  );
  const hasPermissionDeleteUserCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.WORKTIME,
    MethodCode.DELETE
  );
  const hasPermissionCreateUserCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.WORKTIME,
    MethodCode.CREATE
  );
  return {
    // ROLE SUPER ADMIN
    isSuperAdmin,
    // CALENDAR
    hasPermissionCreateCalendar,
    hasPermissionUpdateCalendar,
    hasPermissionDeleteCalendar,
    // USER CALENDAR
    hasPermissionEditUserCalendar,
    hasPermissionViewUserCalendar,
    hasPermissionDeleteUserCalendar,
    hasPermissionCreateUserCalendar,
  };
};

export default usePermission;
