export type CollectionResult<T> = {
  total: number;
  rows: T[];
};

export type ServiceResult<T> = CollectionResult<T> & {
  pagination: {
    start: number;
    limit: number;
  };
};