import { IFilterStatClientResponse } from "../@types/FilterStatClientResponse";

export const generateFilterStatClientResponse = (filter:IFilterStatClientResponse[]) =>{
  let url = "";
  // let nbrKpis = 0;
  filter.forEach(element=>{
    if(element.type==="clientContact" || element.type ==="clientName"){
      url += `${url.length > 0 ? "&" : ""}${element.type}=${element.value}`
    }
  })


  return url
}