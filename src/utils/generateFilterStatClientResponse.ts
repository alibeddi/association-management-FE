import { IFilterStatClientResponse } from '../@types/FilterStatClientResponse';

export const generateFilterStatClientResponse = (
  filter: IFilterStatClientResponse[],
  limit: number | undefined,
  page: number
) => {
  if (limit) {
    filter.push({
      id: new Date().toISOString(),
      type: 'limit',
      value: limit.toString(),
    });
  }
  filter.push({
    id: new Date().toISOString(),
    type: 'page',
    value: page.toString(),
  });

  let url = '';
  let nbrKpis = 0;
  filter.forEach((element) => {
   
    if (element.type !== 'kpis') {
      url += `${url.length > 0 ? '&' : ''}${element.type}=${element.value}`;
    } else {
      url += `${url.length > 0 ? '&' : ''}kpis[${nbrKpis}][kpi]=${element.value}`;
      nbrKpis += 1;
    }
  });
  return url;
};
