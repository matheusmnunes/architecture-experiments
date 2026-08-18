import { schema } from 'sql-string-ts';
import { columnsParams, type Params } from './parameter.schema.js';

export const phone_types = schema({table : 'phone_type_params', columns: columnsParams, alias: 'ptp'});

export type PhoneType = Params;