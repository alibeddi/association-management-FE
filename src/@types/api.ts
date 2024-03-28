export type IGetAll = {
  page: number;
  limit: number;
  orderBy?: string;
  order?: string;
};
export interface GetAllProps extends IGetAll {
  filterName?: string;
  name?: string;
  search?: string;
}
