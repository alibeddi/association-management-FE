import React from 'react';
import { MethodCode, ModelCode } from '../@types/Permission';
import { RoleCode } from '../@types/User';
import { useAuthContext } from '../auth/useAuthContext';
import { findPermission } from '../sections/@dashboard/Permissions/utils';

const usePermission = () => {
  const { user } = useAuthContext();
  const isSuperAdmin = user?.role === RoleCode.SUPER_ADMIN;
  // calendar
  const hasPCreateCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.MY_WORKTIME,
    MethodCode.CREATE
  );
  const hasPUpdateCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.MY_WORKTIME,
    MethodCode.EDIT
  );
  const hasPDeleteCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.MY_WORKTIME,
    MethodCode.DELETE
  );

  // PERMISSION FOR USER CALENDAR
  const hasPEditUserCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.WORKTIME,
    MethodCode.EDIT
  );
  const hasPViewUserCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.WORKTIME,
    MethodCode.VIEW
  );
  const hasPDeleteUserCalendar = findPermission(
    user?.permissionGroup,
    user?.extraPermissions,
    ModelCode.WORKTIME,
    MethodCode.DELETE
  );
  return {
    // ROLE SUPER ADMIN
    isSuperAdmin,
    // CALENDAR
    hasPCreateCalendar,
    hasPUpdateCalendar,
    hasPDeleteCalendar,
    // USER CALENDAR
    hasPEditUserCalendar,
    hasPViewUserCalendar,
    hasPDeleteUserCalendar
  };
};

export default usePermission;
