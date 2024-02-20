export enum FrontType {
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  INPUT = 'input',
  SWITCH = 'switch',
  NONE = '',
}

export interface IKpi {
  _id: string;
  name: string;
  label: string;
  frontType: FrontType;
  options?: string[];
  isRequired: boolean;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}
