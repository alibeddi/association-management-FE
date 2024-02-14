export enum FrontType {
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
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
  options?: (string | number)[];
  isRequired: boolean;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}
