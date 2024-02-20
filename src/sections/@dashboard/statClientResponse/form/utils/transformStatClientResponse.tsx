import { FrontType } from '../../../../../@types/Kpi';
import { StatClientResponse } from '../../../../../@types/StatClientResponse';

export function transformStatClientResponse(
  currentStatClientResponse: StatClientResponse,
  isEdit: boolean,
  statClientDetails: boolean
) {
  if (!(isEdit || statClientDetails) || !currentStatClientResponse) {
    return {};
  }

  const transformedObject: { [key: string]: any } = {};
  const formValues = currentStatClientResponse.kpis || [];

  formValues.forEach((item) => {
    const { kpi, response } = item;
    const kpiName = kpi?.name;
    let value;

    if (kpi?.frontType === FrontType.CHECKBOX) {
      value = response;
    } else {
      value = response[0];
    }

    transformedObject[kpiName] = value;
  });

  return {
    ...transformedObject,
    clientName: currentStatClientResponse.clientName,
    clientContact: currentStatClientResponse.clientContact,
  };
}
