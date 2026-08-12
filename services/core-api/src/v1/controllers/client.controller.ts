import type { RouterContext } from '@koa/router';
import { HttpError } from '../../middlewares/error.middleware.js';
import { success } from '../../middlewares/response.middleware.js';
import { clientListResponseDTO, type GetClientParamsDTO } from '../dtos/client.dto.js';
import { list } from '../services/client.service.js';
import { Context } from '../../types/context.type.js';

const listClients = async (ctx: RouterContext): Promise<void> => {
  const query = (ctx.state.input.query ?? {} as Context);
  const result = await list(query);

  ctx.state.response = success(clientListResponseDTO, result);
};

const getClientById = async (ctx: RouterContext,): Promise<void> => {
  const params = ctx.state.input.params as GetClientParamsDTO;

  const result = await list({
    filters: {
      id: params.id
    },
    pagination: {
      start: 0,
      limit: 1
    }
  });

  ctx.state.response = success(clientListResponseDTO, result);
};

export {
  listClients,
  getClientById
};
