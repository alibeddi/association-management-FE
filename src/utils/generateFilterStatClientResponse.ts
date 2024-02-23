import { IFilterStatClientResponse } from "../@types/FilterStatClientResponse";
import { IKpi } from "../@types/Kpi";
import { IStatsClient } from "../@types/statsClient";
import { User } from "../@types/User";

export const generateFilterStatClientResponse = (filter:IFilterStatClientResponse[],limit:number|undefined,page:number) =>{
  let url = "";
  let nbrKpis = 0;
  filter.forEach(element=>{
    if(element.type==="clientContact" || element.type ==="clientName" || element.type==="statClient" ){
      url += `${url.length > 0 ? "&" : ""}${element.type}=${element.value}`
    }else if(element.type==='kpis'){
      url +=  `${url.length > 0 ? "&" : ""}kpis[${nbrKpis}][kpi]=${(element.value)}`
      nbrKpis+=1
    }else if(element.type ==="adminName"){
      url += `${url.length > 0 ? "&" : ""}admin=${element.value }`
    }else if(limit){
      url += `${url.length > 0 ? "&" : ""}limit=${limit}`
    }else if(page){
      url += `${url.length > 0 ? "&" : ""}page=${page}`
    }

  })
  return url
}