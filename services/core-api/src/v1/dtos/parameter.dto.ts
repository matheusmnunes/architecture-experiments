import { z } from 'zod';
import { defaultColumnsSchema } from '../../domain/schema/parameter.schema.js';

export const clientAddressResponseDTO = defaultColumnsSchema.omit({erased:true})
export type ParameterResponseDTO      = z.output<typeof clientAddressResponseDTO>;
export const parameterListResponseDTO = z.array(clientAddressResponseDTO);
export type ParameterListResponseDTO  = z.output<typeof parameterListResponseDTO>;

export const getParamsDTO = z.object({
    id: z.coerce.number().int().positive()
}).strict();

export type GetParamsDTO = z.output<typeof getParamsDTO>;
