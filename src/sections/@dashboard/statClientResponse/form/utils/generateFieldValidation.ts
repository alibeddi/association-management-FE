import * as Yup from 'yup';
import { IKpi } from '../../../../../@types/Kpi';

export function generateFieldValidation(kpi: IKpi) {
  let schema = Yup.mixed();

  if (kpi.isRequired) {
    schema = schema.required(`${kpi.label} is required`);
  }

  return schema;
}
