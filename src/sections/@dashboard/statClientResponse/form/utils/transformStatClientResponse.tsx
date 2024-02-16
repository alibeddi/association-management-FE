import { BackType } from '../../../../../@types/Kpi';
import { StatClientResponse } from '../../../../../@types/StatClientResponse';

export // Define a new function outside of your component
function transformStatClientResponse(
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

    if (kpi?.backType === BackType.ARRAY) {
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
