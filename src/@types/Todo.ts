export const enum TodoStatus {
  TODO = 'todo',
  COMPLETED = 'completed',
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
