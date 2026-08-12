import type { Middleware } from 'koa';
import { z } from 'zod';

const scalar = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.null(),
]);

const search = z.object({
  value: z.string().trim().min(1),
  properties: z.string().trim().min(1) //pode ser definido no repository
});

const filters = z.record(
  z.string(),
  scalar,
);

const sort = z.array(
  z.object({
    property: z.string().trim().min(1),
    direction: z
      .enum(['ASC', 'DESC'])
      .default('ASC'),
  }),
);

const pagination = z.object({
  start: z.coerce.number().int().nonnegative().default(0),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const querySchema = z.object({
  search: search.optional(),
  filters: filters.optional(),
  sort: sort.optional(),
  pagination: pagination.optional(),
}).strict();

export type QuerySchema = z.output< typeof querySchema>;

type RawQuery = Record<
  string,
  string | string[] | undefined
>;

const firstValue = (
  value: string | string[] | undefined,
): string | undefined => {
  return Array.isArray(value) ? value[0] : value;
};

const normalizeQuery = (raw: RawQuery) => {
  const filters: Record<string, string> = {};

  for (const [key, rawValue] of Object.entries(raw)) {
    const value = firstValue(rawValue);

    if (
      key.startsWith('filters.') &&
      value !== undefined
    ) {
      const property = key.slice('filters.'.length);

      if (property) {
        filters[property] = value;
      }
    }
  }

  const searchValue = firstValue(raw.search);
  const searchProperties = firstValue(
    raw['search.properties'],
  );

  const start = firstValue(
    raw['pagination.start'],
  );

  const limit = firstValue(
    raw['pagination.limit'],
  );

  return {
    search: searchValue
      ? {
          value: searchValue,
          properties: searchProperties,
        }
      : undefined,

    filters:
      Object.keys(filters).length > 0
        ? filters
        : undefined,

    pagination:
      start !== undefined || limit !== undefined
        ? {
            start,
            limit,
          }
        : undefined,
  };
};


export const query: Middleware = async (ctx, next) => {

    const normalized = normalizeQuery(
        ctx.request.query,
    );

    const result = querySchema.safeParse(
      normalized,
    );

    if (!result.success) {
      ctx.status = 400;
      ctx.body = {
        error: 'invalid_query_options',
        issues: result.error.issues,
      };

      return;
    }

    ctx.state.input = {
      ...ctx.state.input,
      query: result.data,
    };

    await next();
    
}
