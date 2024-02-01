export enum FrontType {
  TEXTAREA = 'textarea',
  RADIO = 'input',
  CHECKBOX = 'checkbox',
  SELECT = 'select',
}
export enum BackType {
  STRING = 'String',
  BOOLEAN = 'Boolean',
  ARRAY = 'Array',
}

export interface IKpi {
  _id: string;
  name: string;
  label: string;
  frontType: FrontType;
  backType: BackType;
  options: (string | number)[];
  isRequired: boolean;
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}
