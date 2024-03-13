import { IKpi } from '../../../../../@types/Kpi';

export const formatFormValues = (values: any, kpis: IKpi[]): { kpi: string; response: any[] }[] => {
  const formFields = Object.keys(values);
  return formFields.reduce((array, field) => {
    const foundKpi = kpis.find((kpi) => kpi.name === field);
    if (foundKpi) {
      array.push({
        kpi: foundKpi._id,
        response: typeof values[field] !== 'object' ? [values[field]] : values[field],
      });
    }
    return array;
  }, [] as { kpi: string; response: any[] }[]);
};
