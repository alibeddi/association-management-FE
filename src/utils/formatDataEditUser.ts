import { IPropsEditUser } from '../@types/editUser';
import { Permission } from '../@types/Permission';
import { PermissionGroup } from '../@types/PermissionGroup';

export function formatDataEditUser(data: IPropsEditUser) {
  if (!data.permissionGroup) {
    return data;
  }
  const subPermissionsGroupPermission = data.permissionGroup
    ?.map((group) => (typeof group !== 'string' ? group.permissions ?? [] : []))
    .flat();

  let extraPermissions = data.extraPermissions;

  if (extraPermissions) {
    extraPermissions = (extraPermissions as Permission[]).filter((elt: Permission | string) => {
      if (typeof elt === 'string') return false;
      return !subPermissionsGroupPermission.some((subPerm: Permission) => subPerm._id === elt._id);
    });
  }

  data.permissionGroup = data.permissionGroup.map((elt) =>
    typeof elt === 'string' ? elt : elt._id
  );
  data.extraPermissions =
    extraPermissions && extraPermissions.length > 0
      ? extraPermissions.map((elt) => (typeof elt === 'string' ? elt : elt._id))
      : undefined;
  const countMap: { [key: string]: number } = {};
  let uniqueArray;
  if (data.extraPermissions) {
    data.extraPermissions.forEach((str) => {
      if (typeof str === 'string') countMap[str] = (countMap[str] || 0) + 1;
    });
    uniqueArray = data.extraPermissions.filter((str) => countMap[str] === 1);
  }

  return { ...data, extraPermissions: uniqueArray };
}
