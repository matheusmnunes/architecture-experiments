import pool from '../../util/db/mysql.js';
import { clients_phones, ClientPhone } from '../../domain/schema/client-phone.schema.js';
import { translator, next_i18nID } from '../../util/translation.util.js';
import { selectAll, SQL, bind } from 'sql-string-ts';
import { RowDataPacket } from 'mysql2';
import { Context } from '../../types/context.type.js';
import { CollectionResult } from '../../types/collection.type.js';
import { Fragment, selectBuilder } from 'query-fragments';

type PHONE = ClientPhone & RowDataPacket;
type CountRow = RowDataPacket & { total: number; };

export default class RPhone {

    private conn = pool;

    constructor(conn = null) {

        if (conn) this.conn = conn;
        else this.conn = pool;

    }

    async getAll(data: Context): Promise<CollectionResult<ClientPhone>> {
        const filters = data.filters ?? {};

        const getSQL = (...f:Fragment[]) => {
            const joins = SQL` INNER JOIN phone_type_params p ON p.id = ${clients_phones.phone_type_id}
                        INNER JOIN parameter_translation t ON t.i18n_id = p.i18n_id AND t.lang = ${bind(filters.lang)}`;

            return selectBuilder()
                .select(...f)
                .from(clients_phones)
                .joins()
                    .raw(joins)
                    .end()
                .where(clients_phones, data.filters)
                    .end()
                .build();
        }                
        const sqlT    = getSQL(SQL`COUNT(*) AS total`);
        const [total] = await this.conn.query<CountRow[]>(sqlT);

        const sql = getSQL(selectAll(clients_phones, { as: false }), SQL`t.text`);
        const [rows] = await this.conn.query<PHONE[]>(sql);

        return { rows, total: Number(total[0]?.total ?? 0) };
    }

    insert = async (data: any) => {
        //
    }

    update = async (data: any) => {
        //
    }

    async findByClientIds(clientIds: number[], lang: string): Promise<ClientPhone[]> {
        if (clientIds.length === 0) {
            return [];
        }

        const sql = SQL`SELECT cp.*, t.text AS type FROM clients_phones cp
                    INNER JOIN phone_type_params t ON t.id = cp.phone_type_id
                    WHERE cp.client_id IN (${clientIds})`;

        const [rows] = await this.conn.query<PHONE[]>(sql);
        return rows;
    }

}


