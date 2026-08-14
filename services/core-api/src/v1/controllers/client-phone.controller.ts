import type { RouterContext } from '@koa/router';
import { success } from '../../middlewares/response.middleware.js';
import { clientPhoneListResponseDTO, type GetClientPhoneParamsDTO } from '../dtos/client-phone.dto.js';
import { get } from '../services/client-phone.service.js';
import { Context } from '../../types/context.type.js';

export const listPhones = async (ctx: RouterContext): Promise<void> => {
    const params = ctx.state.input.params as GetClientPhoneParamsDTO;

    const query = (ctx.state.input.query ?? {}) as Context;
    
    const result = await get({
        ...query,

        filters: {
          ...query.filters,
          client_id: params.client_id,
        },
    });

    ctx.state.response = success(clientPhoneListResponseDTO, result);
};

const getClientById = async (ctx: RouterContext,): Promise<void> => {
    const params = ctx.state.input.params as GetClientPhoneParamsDTO;

    const result = await get({
        filters: {
            id: params.client_id
        },
        pagination: {
            start: 0,
            limit: 1
        }
    });

    ctx.state.response = success(clientPhoneListResponseDTO, result);
};

