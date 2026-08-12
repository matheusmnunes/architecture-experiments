import pool from '../../util/db/mysql.js';
import { phones, Phone } from '../../domain/schema/phone.schema.js';
import { translator, next_i18nID } from '../../util/translation.util.js';
import { selectAll, SQL, bind } from 'sql-string-ts';
import { RowDataPacket } from 'mysql2';

type PHONE = Phone & RowDataPacket;
export default class RPhone {

    private conn = pool;

    constructor(conn = null) {

        if (conn) this.conn = conn;
        else this.conn = pool;

    }

    async getAll(data: any) {
        const sql = SQL`SELECT ${selectAll(phones, { as: false })}, t.text AS type FROM ${phones} 
                            INNER JOIN phone_type_params p ON p.id = ${bind(phones.phone_type_id)}
                            INNER JOIN parameter_translation t ON t.i18n_id = p.i18n_id AND t.lang = ${bind(data.lang)}
                            WHERE ${phones.client_id} = ${bind(data.clientId)}`;

        const [rows] = await this.conn.query(sql);
        return rows;
    }

    insert = async (data: any) => {
        //
    }

    update = async (data: any) => {
        //
    }

    async findByClientIds(clientIds: number[],): Promise<Phone[]> {
        if (clientIds.length === 0) {
            return [];
        }

        const sql = SQL`SELECT * FROM clients_phones WHERE client_id IN (${clientIds})`;

        const [rows] = await this.conn.query<PHONE[]>(sql);
        return rows;
    }

}


