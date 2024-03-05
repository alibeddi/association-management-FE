import { IFilterStatClientResponse } from '../@types/FilterStatClientResponse';
import { fDate } from './formatTime';

export const generateFilterStatClientResponse = (
  filter: IFilterStatClientResponse[],
  limit: number | undefined,
  page: number
) => {
  let url = '';
  let nbrKpis = 0;
  filter.forEach((element) => {
    if (element.type === "kpis") {
      url += `${url.length > 0 ? '&' : ''}kpis[${nbrKpis}][kpi]=${element.value}`;
      const relatedReponse = filter.find(elt => elt.type === "response" && elt.id === element.value)

      if (relatedReponse?.choices) {
        Object.entries(relatedReponse?.choices).forEach(([key, value]) => {
          if (value) {
            const encodedValue = encodeURIComponent(key);
            url += `&kpis[${nbrKpis}][response][]=${encodedValue}`;
          }
        });
      }
      nbrKpis += 1;

    }else if(Array.isArray(element.value)){
      element.value.forEach((value,index)=>{
        url += `${url.length > 0 ? '&' : ''}${element.type}[${index}]=${value}`;
      })
    }else if(element.type === "range" && typeof element.value !== "string"){
      url += `${url.length > 0 ? '&' : ''}startDate=${fDate(element.value.startDate,'yyyy-MM-dd')}`;
      url += `${url.length > 0 ? '&' : ''}endDate=${fDate(element.value.endDate,'yyyy-MM-dd')}`;
    }
    else if (element.type !== 'response') {
      url += `${url.length > 0 ? '&' : ''}${element.type}=${element.value}`;
    }
  });

  if (limit) url += `${url.length > 0 ? '&' : ''}limit=${limit}`;
  if (page) url += `${url.length > 0 ? '&' : ''}page=${page}`;

  return url;
};
