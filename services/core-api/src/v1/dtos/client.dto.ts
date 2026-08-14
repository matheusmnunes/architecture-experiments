import { clientSchemaBase } from '../../domain/schema/client.schema.js'
import { z } from 'zod';
import { clientPhoneResponseDTO } from './client-phone.dto.js';
import { clientAddressResponseDTO } from './client-address.dto.js';

export const clientResponseDTO = clientSchemaBase
    .omit({ erased: true })
    .extend({
        phones: z
            .array(clientPhoneResponseDTO)
            .default([]),
        addresses: z
            .array(clientAddressResponseDTO)
            .default([]),
    });

export type ClientResponseDTO = z.output<typeof clientResponseDTO>;

export const clientListResponseDTO = z.array(clientResponseDTO);
export type ClientListResponseDTO = z.output<typeof clientListResponseDTO>;

export const getClientParamsDTO = z.object({
    id: z.coerce.number().int().positive()
}).strict();

export type GetClientParamsDTO = z.output<typeof getClientParamsDTO>;

export const createClientDTO =
    clientSchemaBase
        .pick({
            name: true,
            email: true,
            cpf_cnpj: true,
            person_type: true,
            birth_date: true,
        })
        .required()
        .strict();

export const updateClientDTO =
    clientSchemaBase
        .pick({
            name: true,
            email: true,
            cpf_cnpj: true,
            person_type: true,
            birth_date: true,
            active: true,
        })
        .partial()
        .strict();


class Client {
    constructor(data: ClientResponseDTO
    ) { }

    // addPhone = (phones: Array<phone>): void => {
    // 
    ////TODO: CHAMAR UM util para formatar numeros
    // }
}