import pool from '../../util/db/mysql.js';
import {addresses} from '../../domain/schema/address.schema.js';
import {address_types} from '../../domain/schema/address-type-params.schema.js';
import { pipe } from 'effect'
import { select, selectAs, join, where, all, empty,concat,pick } from '@vanit-co/sql-ts' 

export default class RAddress {

    private conn = pool;

    constructor(conn = null){

        if(conn) this.conn = conn;
        else this.conn = pool;

    }

    getAll = async (data:any) => {
        const sql = pipe(
            select`SELECT ${all(addresses)}, t.text AS type, c.text AS city, s.text AS state FROM ${addresses}`,
            concat(join` INNER JOIN ${address_types} ON ${address_types.id} = ${addresses.id_address_type} `),
            concat(join` INNER JOIN systems.parameter_translation t ON t.i18n_id = ${address_types.i18n_id} AND t.lang = ${data.lang} `),
            concat(join` INNER JOIN systems.cities_params         c ON c.id = ${addresses.id_city}`),
            concat(join` INNER JOIN systems.states_params         s ON s.id = ${addresses.id_state}`),
            concat(where` WHERE ${addresses.id_client} = ${data.clientId}`)
        );
        console
        const [rows] = await this.conn.query(sql);
        return rows;
    }

}
