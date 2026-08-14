import { ServiceResult } from '../../types/collection.type.js';
import { Context } from '../../types/context.type.js';
import RPhone from '../repositories/client-phone.repository.js';
import { ClientPhone } from '../../domain/schema/client-phone.schema.js';

const DEFAULT_START = 0;
const DEFAULT_LIMIT = 20;

export const get = async (query: Context): Promise<ServiceResult<ClientPhone>> => {
    const pagination = {
        start: query.pagination?.start ?? DEFAULT_START,
        limit: query.pagination?.limit ?? DEFAULT_LIMIT
    };

    let phone = new RPhone();
    const result =  await phone.getAll({ ...query, pagination });

    return { ...result, pagination };
 }

export const insert = async (data: any) => {
   let phone = new RPhone();
   return await phone.insert(data);
}

export const update = async (data: any) => {
   let phone = new RPhone();
   return await phone.update(data);
}
