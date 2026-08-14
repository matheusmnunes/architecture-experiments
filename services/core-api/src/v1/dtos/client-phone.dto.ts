import { clientPhoneSchemaBase } from "../../domain/schema/client-phone.schema.js";
import { z } from 'zod';

export const clientPhoneResponseDTO = 
    clientPhoneSchemaBase
        .omit({ erased: true })
        .extend({type:z.string().optional()});

export type ClientPhoneResponseDTO = z.output<typeof clientPhoneSchemaBase>

export const clientPhoneListResponseDTO = z.array(clientPhoneResponseDTO);
export type ClientPhoneListResponseDTO = z.output<typeof clientPhoneListResponseDTO>;

export const getClientPhoneParamsDTO = z.object({
    client_id: z.coerce.number().int().positive()
}).strict();

export type GetClientPhoneParamsDTO = z.output<typeof getClientPhoneParamsDTO>;

//class Phone {
//    constructor(data: PhoneResponseDTO) { }
//}