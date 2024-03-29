import { User } from './User';

export interface Note {
  _id: string;
  title: string;
  tags: User[];
  content: string;
  createdAt: Date;
  createdBy: User;
}
