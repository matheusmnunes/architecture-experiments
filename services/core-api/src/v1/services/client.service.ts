import { Client } from '../../domain/schema/client.schema.js';
import { Phone } from '../../domain/schema/phone.schema.js';
import { ServiceResult } from '../../types/collection.type.js';
import { Context } from '../../types/context.type.js';
import RClient from '../repositories/client.repository.js';
import RPhone from '../repositories/phone.repository.js';


const DEFAULT_START = 0;
const DEFAULT_LIMIT = 20;

export const list = async (query: Context): Promise<ServiceResult<Client & { phones: Phone[]; }>> => {
    const pagination = {
        start: query.pagination?.start ?? DEFAULT_START,
        limit: query.pagination?.limit ?? DEFAULT_LIMIT
    };

    const client_db = new RClient();
    const result    = await client_db.getAll({ ...query, pagination });

    const clientIds =
        result.rows
            .map(client => client.id)
            .filter((id): id is number => id !== undefined);

    const phone_db = new RPhone();
    const phones   = await phone_db.findByClientIds(clientIds);

    const phonesByClient = new Map<number, Phone[]>();

    for (const phone of phones) {
        const current = phonesByClient.get(phone.client_id) ?? [];

        current.push(phone);

        phonesByClient.set(phone.client_id, current);
    }

    const rows = result.rows.map(
        client => ({
            ...client,
            phones:
                client.id === undefined
                    ? []
                    : phonesByClient.get(client.id,) ?? []
        })
    );


    return { ...result, rows, pagination };
}
