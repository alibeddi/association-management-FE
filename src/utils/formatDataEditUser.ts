import { IPropsEditUser } from "../@types/editUser";
import { Permission } from "../@types/Permission";

export function formatDataEditUser(data: IPropsEditUser) {
  
  if (!data.permissionGroup || data.permissionGroup.length === 0) {
    return data;
  }
  
  const subPermissionsGroupPermission = data.permissionGroup
    ?.map((group: any) => group.permissions ?? [])
    .flat();
  
  let extraPermissions = data.extraPermissions;
  
  if (extraPermissions) {
    // @ts-ignore
    extraPermissions = extraPermissions.filter((elt: Permission) =>
      !subPermissionsGroupPermission.some((subPerm: Permission) => 
        subPerm._id === elt._id
      )
    );
  }
  
  data.permissionGroup = data.permissionGroup.map((elt: any) => 
    typeof elt === "string" ? elt : elt._id
  );
  data.extraPermissions = extraPermissions && extraPermissions.length > 0 ? 
  extraPermissions.map((elt: any) => 
    typeof elt === "string" ? elt : elt._id
  ) : 
  undefined;
  // @ts-ignore
  const countMap: { [key: string]: number } = {};
  let uniqueArray;
  if( data.extraPermissions){
    data.extraPermissions.forEach(str => {
      if(typeof str==="string") countMap[str] = (countMap[str] || 0) + 1
    })
  // @ts-ignore
      uniqueArray = data.extraPermissions.filter(str => countMap[str] === 1);
  }

   
  return {...data,extraPermissions:uniqueArray};
}