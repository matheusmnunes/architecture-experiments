import { ClientAddress } from '../../domain/schema/client-address.schema.js';
import { ServiceResult } from '../../types/collection.type.js';
import { Context } from '../../types/context.type.js';
import RAddress from '../repositories/client-address.repository.js';

const DEFAULT_START = 0;
const DEFAULT_LIMIT = 20;

export const get = async (query: Context): Promise<ServiceResult<ClientAddress>> => {
    const pagination = {
        start: query.pagination?.start ?? DEFAULT_START,
        limit: query.pagination?.limit ?? DEFAULT_LIMIT
    };

    let address = new RAddress();
    const result = await address.getAll({ ...query, pagination });
    
    return { ...result, pagination };
 }

