import * as Yup from 'yup';
import { IKpi } from '../../../../../@types/Kpi';

export function generateFieldValidation(kpi: IKpi) {
  let schema: Yup.BaseSchema<any, any>;

  switch (kpi.backType) {
    case 'array':
      schema = Yup.array();
      break;
    case 'string':
      schema = Yup.string();
      break;
    case 'boolean':
      schema = Yup.boolean();
      break;
    default:
      throw new Error(`Unsupported field type: ${kpi.backType}`);
  }

  if (kpi.isRequired) {
    schema = schema.required(`${kpi.label} is required`);
  }

  return schema;
}
