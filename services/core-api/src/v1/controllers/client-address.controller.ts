import type { RouterContext } from '@koa/router';
import { success } from '../../middlewares/response.middleware.js';
import { get } from '../services/client-address.service.js';
import { Context } from '../../types/context.type.js';
import { clientAddressListResponseDTO, GetClientAddressParamsDTO } from '../dtos/client-address.dto.js';

export const listAddresses = async (ctx: RouterContext): Promise<void> => {
    const params = ctx.state.input.params as GetClientAddressParamsDTO;

    const query = (ctx.state.input.query ?? {}) as Context;
    
    const result = await get({
        ...query,

        filters: {
          ...query.filters,
          client_id: params.client_id,
        },
    });

    ctx.state.response = success(clientAddressListResponseDTO, result);
};

const getAddressById = async (ctx: RouterContext,): Promise<void> => {
    const params = ctx.state.input.params as GetClientAddressParamsDTO;

    const result = await get({
        filters: {
            id: params.client_id
        },
        pagination: {
            start: 0,
            limit: 1
        }
    });

    ctx.state.response = success(clientAddressListResponseDTO, result);
};

