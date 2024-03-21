import { User } from './User';

export interface Note {
  title: string;
  tags: User[];
  content: string;
}
