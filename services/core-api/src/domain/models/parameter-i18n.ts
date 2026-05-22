import * as z from 'zod';
import { defaultColumns, defaultColumnsSchema } from './parameter';


const defaultColumnsI18nSchemaZ = z.object({
    i18n_id: z.number()
});

const defaultColumnsI18nSchema = defaultColumnsSchema.omit({ text: true }).extend({i18n_id: z.number()});

const defaultColumnsI18n = Object.keys(defaultColumnsI18nSchema.shape) as Array<keyof z.infer<typeof defaultColumnsI18nSchema>>;

export {
    defaultColumnsI18n,
    defaultColumnsI18nSchema
}