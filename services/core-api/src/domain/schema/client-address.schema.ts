import { schema } from 'sql-string-ts';
import { z } from 'zod';
import { schemaToEnum } from '../../util/schema-helper.util.js';

export const clientAddressSchemaBase = z.object({
    id             : z.number(),
    client_id      : z.number(),
    address_type_id: z.number(),
    street         : z.string().max(200),
    number         : z.string().max(10),
    complement     : z.string().max(100).nullable(),
    reference      : z.string().max(150).nullable(),
    zip_code       : z.string().length(8),
    city_id        : z.number(),
    state_id       : z.number(),
    erased         : z.number().lte(1).nonnegative()
});

const columns = schemaToEnum(clientAddressSchemaBase);

export const clients_addresses = schema({table : 'clients_addresses', columns: columns, alias: 'ca'});

export type ClientAddress = z.output<typeof clientAddressSchemaBase>;


