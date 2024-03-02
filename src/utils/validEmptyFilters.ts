import { IFilterStatClientResponse } from "../@types/FilterStatClientResponse";

const  validNotEmptyFilters = (data: IFilterStatClientResponse[]) =>  data.every(filter => (filter.type && filter.type !=="")  && (filter.value && (  filter.value !=="")));

export default  validNotEmptyFilters