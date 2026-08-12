import { z } from 'zod';
import { clientAddressSchemaBase } from '../../domain/schema/client-address.schema.js';

export const clientAdressResponseDTO = clientAddressSchemaBase
    .omit({erased: true})
    .extend({
        address_type:z.string()
    });

export type ClientAdressResponseDTO = z.output<typeof clientAdressResponseDTO>;
export const clientAdressListResponseDTO = z.array(clientAdressResponseDTO);
export type ClientAdressListResponseDTO = z.output<typeof clientAdressListResponseDTO>;

/*
class ClientAddress {
    //constructor(data:phone
    //){}
}*/