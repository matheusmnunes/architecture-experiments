import { schema } from 'sql-string-ts';
import { z } from 'zod';
import {  defaultColumnsI18nSchema } from './parameter-i18n.schema.js';
import { getSchemaColumns, schemaToEnum } from '../../util/schema-helper.util.js';

const addColumnsSchema = z.object({
    text: z.string({
        error : 'errorFieldRequired'
    }),
    lang: z.string({
        error : 'errorFieldRequired'
    }),
    namespace: z.string({
        error : 'errorFieldRequired'
    }),
});

const parameterTranslationSchema = defaultColumnsI18nSchema.omit({active: true}).merge(addColumnsSchema);

const columns = schemaToEnum(parameterTranslationSchema);

const parameterTranslation = schema({table : 'parameter_translation', columns: columns, alias: 'pt'});

export {
    parameterTranslation,
    parameterTranslationSchema
};
