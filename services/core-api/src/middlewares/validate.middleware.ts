import type { Middleware } from 'koa';
import type { ZodType } from 'zod';

type RequestSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

type InputSource = keyof RequestSchemas;

const sources: InputSource[] = ['body', 'params', 'query'];

export const validate = (schemas: RequestSchemas): Middleware => {
  return async (ctx, next) => {
    const rawInput: Record<InputSource, unknown> = {
      body: (ctx.request as typeof ctx.request & { body?: unknown }).body,
      params: ctx.params,
      query: ctx.request.query,
    };

    const input: Partial<Record<InputSource, unknown>> = {};

    for (const source of sources) {
      const schema = schemas[source];

      if (!schema) continue;

      const result = await schema.safeParseAsync(rawInput[source]);

      if (!result.success) {
        ctx.status = 400;
        ctx.body = {
          error: 'invalid_request',
          source,
          issues: result.error.issues,
        };

        return;
      }

      input[source] = result.data;
    }

    ctx.state.input = {
      ...ctx.state.input,
      ...input,
    };

    await next();
  };
};
