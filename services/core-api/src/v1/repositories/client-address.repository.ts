import pool from '../../util/db/mysql.js';
import { 
    clients_addresses as addresses 
} from '../../domain/schema/client-address.schema.js';
import { address_types } from '../../domain/schema/address-type-params.schema.js';
import { SQL, selectAll } from 'sql-string-ts';

export default class RAddress {

    private conn = pool;

    constructor(conn = null){

        if(conn) this.conn = conn;
        else this.conn = pool;

    }

    async getAll(data:any){
        const sql = 
            SQL`SELECT ${selectAll(addresses, {as:false})}, t.text AS type, c.text AS city, s.text AS state 
                FROM ${addresses}
                INNER JOIN ${address_types} ON ${address_types.id} = ${addresses.address_type_id}
                INNER JOIN systems.parameter_translation t ON t.i18n_id = ${address_types.i18n_id} AND t.lang = ${data.lang}
                INNER JOIN systems.cities_params         c ON c.id = ${addresses.city_id}
                INNER JOIN systems.states_params         s ON s.id = ${addresses.state_id}
                WHERE ${addresses.client_id} = ${data.clientId}`;
        
        const [rows] = await this.conn.query(sql);
        return rows;
    }

}
