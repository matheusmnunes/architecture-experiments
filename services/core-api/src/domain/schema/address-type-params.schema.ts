import { schema } from 'sql-string-ts';
import { z } from 'zod';
import { schemaToEnum } from '../../util/schema-helper.util.js';
import { defaultColumnsSchema } from './parameter.schema.js';

export const addressTypeSchemaBase = defaultColumnsSchema.extend({code: z.string()});

const columns = schemaToEnum(addressTypeSchemaBase);

export const address_types = schema({table : 'address_type_params', columns: columns, alias: 'atp'});

export type AddressType = z.output<typeof addressTypeSchemaBase>;

//type address_type = {
//    id     : number,
//    i18n_id: number,
//    text   : string,
//    code   : string,
//}
