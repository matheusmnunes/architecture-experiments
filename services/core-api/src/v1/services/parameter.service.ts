import { Schema } from 'sql-string-ts';
import { Params } from '../../domain/schema/parameter.schema.js';
import { CollectionResult, ServiceResult } from '../../types/collection.type.js';
import { Context } from '../../types/context.type.js';
import RAddress from '../repositories/client-address.repository.js';
import { EnumType } from 'query-fragments';
import ParamaterRepository from '../repositories/parameter.repository.js';

const DEFAULT_START = 0;
const DEFAULT_LIMIT = 20;

export const parameterService = <T = Params>(table: Schema<EnumType>) => {
    const get = async (query: Context): Promise<ServiceResult<T>> => {
        const pagination = {
            start: query.pagination?.start ?? DEFAULT_START,
            limit: query.pagination?.limit ?? DEFAULT_LIMIT
        };

        const repository = new ParamaterRepository();
        const result     = await repository
            .getAll<T>(table)
            .load({ ...query, pagination });

        return { ...result, pagination };
    }

    return { get };
}

