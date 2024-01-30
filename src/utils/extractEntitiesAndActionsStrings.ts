import { Permission } from "../@types/Permission";

export function extractEntitiesAndActionsStrings(data: Permission[]) {
  const resultStrings: string[] = [];

  data?.forEach((item: Permission) => {
    if (item.model && item.method) {
      const entityActionString = `${item.model}_${item.method}`;
      if (!resultStrings.includes(entityActionString)) {
        resultStrings.push(entityActionString);
      }
    }
  });

  return resultStrings;
}
