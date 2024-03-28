import { User } from "./User";

export type ICall = {
  calls: {
    maked:number,
    received: number
  };
  date?: Date | string;
  user?: User;
  _id?: string;
}
