import { IKpi } from '../../../../../@types/Kpi';

export const formatFormValues = (values: any, kpis: IKpi[]): { kpi: string; response: any[] }[] => {
  const formFields = Object.keys(values);
  return formFields.reduce((array, field) => {
    const foundKpi = kpis.find((kpi) => kpi.name === field);
    if (foundKpi && values[field]) {
      array.push({ kpi: foundKpi._id, response: [values[field]] });
    }
    return array;
  }, [] as { kpi: string; response: any[] }[]);
};
