export const enum TodoStatus {
  TODO = 'todo',
  INPROGRESS = 'in progress',
  BLOCKED = 'blocked',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export interface Todo {
  _id: string;
  authorId: string;
  description: string;
  status: TodoStatus;
  tags: string[];
  createdAt?: Date;
  deletedAt?: Date;
  updatedAt?: Date;
}
