export interface Meta {
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    hasMore: boolean;
    totalDocs: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    prevPage: number;
    nextPage: number;
  }
  
  export interface PaginationModel<T> {
    docs: T[];
    meta: Meta;
  }
  