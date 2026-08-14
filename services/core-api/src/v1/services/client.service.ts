import { Client }        from '../../domain/schema/client.schema.js';
import { ClientPhone }   from '../../domain/schema/client-phone.schema.js';
import { ServiceResult } from '../../types/collection.type.js';
import { Context }       from '../../types/context.type.js';
import RClient           from '../repositories/client.repository.js';
import RPhone            from '../repositories/client-phone.repository.js';
import RAddress          from '../repositories/client-address.repository.js';
import { ClientAddress } from '../../domain/schema/client-address.schema.js';


const DEFAULT_START = 0;
const DEFAULT_LIMIT = 20;

export const list = async (query: Context): Promise<ServiceResult<Client & { phones: ClientPhone[]; }>> => {
    const pagination = {
        start: query.pagination?.start ?? DEFAULT_START,
        limit: query.pagination?.limit ?? DEFAULT_LIMIT
    };

    const lang = (query.filters?.lang ?? 'pt-BR') as string ;

    const client_db = new RClient();
    const result    = await client_db.getAll({ ...query, pagination });

    const clientIds = 
        result.rows
            .map(client => client.id)
            .filter((id): id is number => id !== undefined);

    const phone_db = new RPhone();
    const phones   = await phone_db.findByClientIds(clientIds, lang);

    const phonesByClient = new Map<number, ClientPhone[]>();

    for (const phone of phones) {
        const current = phonesByClient.get(phone.client_id) ?? [];

        current.push(phone);

        phonesByClient.set(phone.client_id, current);
    }
    
    const address_db      = new RAddress();
    const addresses       = await address_db.findByClientIds(clientIds, lang);
    const addressByClient = new Map<number, ClientAddress[]>();

    for (const address of addresses) {
        const current = addressByClient.get(address.client_id) ?? [];

        current.push(address);

        addressByClient.set(address.client_id, current);
    }

    const rows = result.rows.map(
        client => ({
            ...client,
            phones: 
                client.id === undefined
                    ? []
                    :  phonesByClient.get(client.id,) ?? [],
            addresses: 
                client.id === undefined
                    ? []
                    :  addressByClient.get(client.id,) ?? []
        })
    );


    return { ...result, rows, pagination };
}
