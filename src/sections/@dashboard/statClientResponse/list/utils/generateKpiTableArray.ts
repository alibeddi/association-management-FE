import { IKpi } from '../../../../../@types/Kpi';

type KpiResponse = { kpi: IKpi; response: any[] };
export const generateKpiTableArray = (
  statClientKpis: IKpi[] | undefined,
  statClientResponses: KpiResponse[]
): KpiResponse[] => {
  const kpiTableArray: KpiResponse[] = [];

  const responseMap = new Map();
  statClientResponses.forEach(({ kpi, response }) => {
    responseMap.set(kpi._id, response);
  });

  statClientKpis?.forEach((kpi) => {
    const response = responseMap.get(kpi._id) || [];
    kpiTableArray.push({ kpi, response });
  });

  return kpiTableArray;
};
