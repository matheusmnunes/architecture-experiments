import pool from '../../util/db/mysql.js';
import { 
    clients_addresses as addresses, 
    ClientAddress
} from '../../domain/schema/client-address.schema.js';
import { address_types } from '../../domain/schema/address-type-param.schema.js';
import { SQL, selectAll, bind } from 'sql-string-ts';
import { Context } from '../../types/context.type.js';
import { CollectionResult } from '../../types/collection.type.js';
import { RowDataPacket } from 'mysql2';
import { Fragment } from 'query-fragments';

type ADDRESS = ClientAddress & RowDataPacket;
type CountRow = RowDataPacket & { total: number; };

export default class RAddress {

    private conn = pool;

    constructor(conn = null){

        if(conn) this.conn = conn;
        else this.conn = pool;

    }

    async getAll(data:Context):Promise<CollectionResult<ClientAddress>>{
        const filters = data.filters ?? {};

        const getSQL = (f:Fragment) => {

            return SQL`SELECT ${f} FROM ${addresses}
                INNER JOIN ${address_types}                ON ${address_types.id} = ${addresses.address_type_id}
                INNER JOIN parameter_translation t ON t.i18n_id = ${address_types.i18n_id} AND t.lang = ${bind(filters.lang)}
                INNER JOIN cities_params         c ON c.id = ${addresses.city_id}
                INNER JOIN states_params         s ON s.id = ${addresses.state_id}
                WHERE ${addresses.client_id} = ${bind(filters.client_id)}`;
        }  
        
        const sqlT    = getSQL(SQL`COUNT(*) AS total`);
        const [total] = await this.conn.query<CountRow[]>(sqlT);

        const sql    = getSQL(selectAll(addresses, {as:false}).concat(SQL`,t.text AS type, c.text AS city, s.text AS state`));
        const [rows] = await this.conn.query<ADDRESS[]>(sql);

        return { rows, total: Number(total[0]?.total ?? 0) };
    }

    async findByClientIds(clientIds: number[], lang: string): Promise<ClientAddress[]> {
            if (clientIds.length === 0) {
                return [];
            }

            const f = selectAll(addresses, {as:false}).concat(SQL`,t.text AS type, c.text AS city, s.text AS state`);
    
            const sql = SQL`SELECT ${f} FROM ${addresses} 
                INNER JOIN ${address_types}                ON ${address_types.id} = ${addresses.address_type_id}
                INNER JOIN parameter_translation         t ON t.i18n_id = ${address_types.i18n_id} AND 
                    t.lang = ${bind(lang)}
                INNER JOIN cities_params                 c ON c.id = ${addresses.city_id}
                INNER JOIN states_params                 s ON s.id = ${addresses.state_id}
                WHERE ${addresses.client_id} IN (${clientIds})`;
            
            const [rows] = await this.conn.query<ADDRESS[]>(sql);
            return rows;
        }

}
