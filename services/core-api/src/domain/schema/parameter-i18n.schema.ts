import * as z from 'zod';
import { defaultColumnsSchema } from './parameter.schema.js';
import { getSchemaColumns } from '../../util/schema-helper.util.js';

const defaultColumnsI18nSchema = defaultColumnsSchema.omit({ text: true }).extend({i18n_id: z.number()});
const defaultColumnsI18n       = getSchemaColumns(defaultColumnsI18nSchema);

export {
    defaultColumnsI18n,
    defaultColumnsI18nSchema
}
