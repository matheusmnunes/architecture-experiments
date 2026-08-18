import { z } from 'zod';
import { schema } from 'sql-string-ts';
import { defaultColumnsSchema, type Params } from './parameter.schema.js';
import { schemaToEnum } from '../../util/schema-helper.util.js';

const columnsBase = defaultColumnsSchema.extend({code: z.string()});

export const columnsParams = schemaToEnum(columnsBase)

export const address_types = schema({table : 'address_type_params', columns: columnsParams, alias: 'atp'});

export type AddressType = z.output<typeof columnsBase>;;