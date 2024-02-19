export enum FrontType {
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
  INPUT = 'input',
}
export enum BackType {
  STRING = 'string',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
}

export interface IKpi {
  _id: string;
  name: string;
  label: string;
  frontType: FrontType;
  backType: BackType;
  options?: string[];
  isRequired: boolean;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}
