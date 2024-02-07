export interface Meta {
  hasMore: boolean;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number;
  prevPage: number;
  page: number;
  pagingCounter: number;
  totalDocs: number;
  totalPages: number;
}

export interface PaginationModel<T> {
  docs: T[];
  meta: Meta;
}
