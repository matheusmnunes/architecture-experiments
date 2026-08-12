import type { Middleware } from 'koa';
import type { ZodType } from 'zod';


type SuccessResponse = {
  type: 'success';
  total: number;
  rows: unknown[];
  pagination?: {
    start: number;
    limit: number;
  };
};

type CollectionResult = {
  rows: unknown[];
  total: number;
  pagination?: {
    start: number;
    limit: number;
  };
};

export type HttpResponse = SuccessResponse;

export const success = ( schema: ZodType<unknown[]>, result: CollectionResult ): HttpResponse => ({
  type      : 'success',
  total     : result.total,
  rows      : schema.parse(result.rows),
  pagination: result.pagination,
});

export const response: Middleware = async ( ctx, next ) => {
  await next();

  const result = ctx.state.response as | HttpResponse | undefined;

  if (!result) return;

  ctx.body = {
    success: true,
    total  : result.total,
    rows   : result.rows,
    ...(result.pagination && { pagination: result.pagination }),
  };
};
