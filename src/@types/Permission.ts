export interface Permission {
  _id: string;
  model: string;
  method: string;
  deletedAt?: Date;
}
