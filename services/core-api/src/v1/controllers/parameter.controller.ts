import type { RouterContext } from '@koa/router';
import { success } from '../../middlewares/response.middleware.js';
import { Context } from '../../types/context.type.js';
import { parameterListResponseDTO, ParameterResponseDTO, GetParamsDTO } from '../dtos/parameter.dto.js';
import { ServiceResult } from '../../types/collection.type.js';

type ParameterService<T = unknown> = (
    query: Context
) => Promise<ServiceResult<T>>;

export const list = <T>(service: ParameterService<T>) => {
    return async ( ctx: RouterContext  ): Promise<void> => {
        const params = ctx.state.input.params as GetParamsDTO;

        const query = (ctx.state.input.query ?? {}) as Context;
    
        const result = await service({
        ...query,

        filters: {
          ...query.filters,
          ...params
        },
    });

        ctx.state.response = success(parameterListResponseDTO, result);
    }
    
};

//const getAddressById = async (ctx: RouterContext,): Promise<void> => {
//    const params = ctx.state.input.params as GetClientAddressParamsDTO;
//
//    const result = await get({
//        filters: {
//            id: params.client_id
//        },
//        pagination: {
//            start: 0,
//            limit: 1
//        }
//    });
//
//    ctx.state.response = success(clientAddressListResponseDTO, result);
//};

