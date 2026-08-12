type EnumType = Record<string, string | number>;

export type Context = {
  search?: {
    value: string;
    properties: string;
  };

  //filters?: Record<string, string | number | boolean | null>;
  filters?: EnumType;
  sort?: Array<{ property: string; direction: 'ASC' | 'DESC'; }>;

  pagination?: {
    start: number;
    limit: number;
  };
};