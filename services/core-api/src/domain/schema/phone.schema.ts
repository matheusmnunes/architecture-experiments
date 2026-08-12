import { schema } from 'sql-string-ts';
import { z } from 'zod';
import { schemaToEnum } from '../../util/schema-helper.util.js';

export const phoneSchemaBase = z.object({
    id           : z.number(),
    client_id    : z.number(),
    phone_type_id: z.number(),
    number       : z.string(),
    main         : z.number(),
    erased       : z.number(),
});

const columns = schemaToEnum(phoneSchemaBase);

export const phones = schema({ table: 'clients_phones', columns: columns, alias: 'cp' });

export type Phone = z.output<typeof phoneSchemaBase>;

