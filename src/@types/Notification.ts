import { Todo } from './Todo';
import { User } from './User';

export const enum NOTIFICATIONS_DOCS {
  TODO = 'Todo',
}
export interface Notification {
  _id: string;
  from: User;
  to: string | User;
  message: string;
  todoId: string;
  seen: boolean;
  seenAt: Date;
  doc: string | Todo;
  docModel: NOTIFICATIONS_DOCS;
  createdAt: Date;
}
