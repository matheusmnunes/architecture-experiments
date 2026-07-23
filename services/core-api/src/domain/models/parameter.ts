import * as z from 'zod';
import { getSchemaColumns } from '../../util/schema-helper.util';

const defaultColumnsSchema = z.object({
    id: z.number().optional(),
    text: z.string({
        error : 'errorFieldRequired',
    }),
    active: z.number().lte(1, {message:'errorActiveInvalid'}).nonnegative().optional(),
    erased: z.number().lte(1).nonnegative().optional(),
});

//const defaultColumns = Object.keys(defaultColumnsSchema.shape) as Array<keyof z.infer<typeof defaultColumnsSchema>>;
const defaultColumns = getSchemaColumns(defaultColumnsSchema);

export {
    defaultColumns,
    defaultColumnsSchema
}