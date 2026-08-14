import { schema } from 'sql-string-ts';
import { z } from 'zod';
import { schemaToEnum } from '../../util/schema-helper.util.js';

export const clientSchemaBase = z.object({
    id  : z.number().optional(),
    name: z.string({ error: 'errorFieldRequired' }),
    email      : z.string(),
    cpf_cnpj   : z.string(),
    person_type: z.string().length(1),
    birth_date : z.coerce.date(),
    active     : z.number().lte(1, { message: 'errorActiveInvalid' }).nonnegative(),
    created_at : z.date(),
    updated_at : z.date().optional(),
    erased     : z.number().lte(1).nonnegative()
});

const columns = schemaToEnum(clientSchemaBase);

export const clients = schema({ table: 'clients', columns: columns, alias: 'c' });

export type Client = z.output<typeof clientSchemaBase>;
