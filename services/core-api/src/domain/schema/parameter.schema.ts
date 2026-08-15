import * as z from 'zod';
import { getSchemaColumns, schemaToEnum } from '../../util/schema-helper.util.js';

export const defaultColumnsSchema = z.object({
    id     : z.number().optional(),
    i18n_id: z.number(),
    text   : z.string({
        error : 'errorFieldRequired',
    }),
    active: z.number().lte(1, {message:'errorActiveInvalid'}).nonnegative().optional(),
    erased: z.number().lte(1).nonnegative().optional(),
});

//const defaultColumns = Object.keys(defaultColumnsSchema.shape) as Array<keyof z.infer<typeof defaultColumnsSchema>>;
export const defaultColumns = getSchemaColumns(defaultColumnsSchema);

export const columnsParams = schemaToEnum(defaultColumnsSchema);

export type Params = z.output<typeof defaultColumnsSchema>;

