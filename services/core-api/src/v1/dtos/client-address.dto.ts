import { z } from 'zod';
import { clientAddressSchemaBase } from '../../domain/schema/client-address.schema.js';

export const clientAddressResponseDTO = clientAddressSchemaBase
    .omit({erased: true})
    .extend({
        type : z.string().optional(),
        city : z.string().optional(),
        state: z.string().optional()
    });

export type ClientAddressResponseDTO = z.output<typeof clientAddressResponseDTO>;
export const clientAddressListResponseDTO = z.array(clientAddressResponseDTO);
export type ClientAddressListResponseDTO = z.output<typeof clientAddressListResponseDTO>;


export const getClientAddressParamsDTO = z.object({
    client_id: z.coerce.number().int().positive()
}).strict();

export type GetClientAddressParamsDTO = z.output<typeof getClientAddressParamsDTO>;
/*
class ClientAddress {
    //constructor(data:phone
    //){}
}*/