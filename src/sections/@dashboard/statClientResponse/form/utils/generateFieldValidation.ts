import * as Yup from 'yup';
import { BackType, FrontType, IKpi } from '../../../../../@types/Kpi';

export function generateFieldValidation(kpi: IKpi) {
  let schema: Yup.BaseSchema<any, any>;
  switch (kpi.backType) {
    case BackType.ARRAY:
      schema = Yup.array();
      break;
    case BackType.STRING:
      schema = Yup.string();
      break;
    case BackType.BOOLEAN:
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
