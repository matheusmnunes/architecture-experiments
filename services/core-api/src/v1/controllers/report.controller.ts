import type { RouterContext } from '@koa/router';
import { success } from '../../middlewares/response.middleware.js';
import { Context } from '../../types/context.type.js';
import { generatedReportResponseDTO, GenerateReportParamsDTO } from '../dtos/report.dto.js';
import { generate} from '../services/report.service.js';

export const get = async (ctx: RouterContext): Promise<void> => {
    
    const params = ctx.state.input.params as GenerateReportParamsDTO;

    const query = (ctx.state.input.query ?? {}) as Context;

    const result = await generate({
        ...query,
        filters: {
          ...query.filters,
          id: params.id,
        }
  } );

    ctx.body = {
        success: true,
        ...generatedReportResponseDTO.parse(result)
    };
};

