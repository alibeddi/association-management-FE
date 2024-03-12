import { IPropsEditUser } from "../@types/editUser";
import { Permission } from "../@types/Permission";

export function formatDataEditUser(data: IPropsEditUser) {
  
  if (!data.permissionGroup || data.permissionGroup.length === 0) {
    return data;
  }
  
  const subPermissionsGroupPermission = data.permissionGroup
    ?.map((group: any) => group.permissions ?? [])
    .flat();
  
  let extraPermission = data.extraPermission;
  
  if (extraPermission) {
    // @ts-ignore
    extraPermission = extraPermission.filter((elt: Permission) =>
      !subPermissionsGroupPermission.some((subPerm: Permission) => 
        subPerm._id === elt._id
      )
    );
  }
  
  data.permissionGroup = data.permissionGroup.map((elt: any) => 
    typeof elt === "string" ? elt : elt._id
  );
  
  return {
    ...data,
    extraPermission: extraPermission && extraPermission.length > 0 ? 
      extraPermission.map((elt: any) => 
        typeof elt === "string" ? elt : elt._id
      ) : 
      undefined,
  };
}