const  validNotEmptyFilters = (data: { id: string, type: string, value: string }[]) =>  data.every(filter => (filter.type && filter.type !=="")  && (filter.value && filter.value !==""));

export default  validNotEmptyFilters