import { schema } from '@vanit-co/sql-ts';
import { z } from 'zod';
import { defaultColumnsI18n, defaultColumnsI18nSchema } from './parameter-i18n';

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

const parameterTranslationSchema = defaultColumnsI18nSchema.merge(addColumnsSchema);

const columns = Object.keys(parameterTranslationSchema.shape) as Array<keyof z.infer<typeof parameterTranslationSchema>>;

const parameterTranslation = schema({table : 'parameter_translation', columns: columns, alias: 'pt'});

export {
    parameterTranslation,
    parameterTranslationSchema
};
