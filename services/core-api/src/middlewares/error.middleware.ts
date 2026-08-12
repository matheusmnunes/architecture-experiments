// middlewares/error.middleware.ts

import type { Middleware } from 'koa';
import { ZodError } from 'zod';

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);

    this.name = 'HttpError';
  }
}

export const errorHandler: Middleware = async (
  ctx,
  next,
) => {
  try {
    await next();
  } catch (error) {
    if (error instanceof HttpError) {
      ctx.status = error.status;

      ctx.body = {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      };

      return;
    }

    if (error instanceof ZodError) {
      ctx.status = 500;

      ctx.body = {
        success: false,
        error: {
          code: 'invalid_internal_response',
          message:
            'O sistema produziu uma resposta inválida',
        },
      };

      return;
    }

    ctx.status = 500;
    ctx.body = {
      success: false,
      error: {
        code: 'internal_error',
        message: 'Erro interno',
      },
    };

    ctx.app.emit('error', error, ctx);
  }
};