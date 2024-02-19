import { Office } from './Office';

export interface User {
  _id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  office: Office;
  createdAt: Date | null;
}

export type IUserAccountGeneral = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};
