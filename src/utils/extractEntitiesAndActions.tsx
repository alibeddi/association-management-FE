import { Permission } from 'src/@types/Permission';

export function extractEntitiesAndActions(data: Permission[]) {
  const entities: string[] = [];
  const actions: string[] = [];

  data?.forEach((item) => {
    if (item.model && !entities.includes(item.model)) {
      entities.push(item.model);
    }

    if (item.method && !actions.includes(item.method)) {
      actions.push(item.method);
    }
  });

  return { entities, actions };
}
