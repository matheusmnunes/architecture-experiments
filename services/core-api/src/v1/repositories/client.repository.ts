import pool from '../../util/db/mysql.js';
import { clients, Client } from '../../domain/schema/client.schema.js';
import { SQL, selectAll } from 'sql-string-ts'
import { RowDataPacket } from 'mysql2';
import { CollectionResult } from '../../types/collection.type.js';
import { Context } from '../../types/context.type.js';
import { selectBuilder } from 'query-fragments';

type CLIENT = Client & RowDataPacket;
type CountRow = RowDataPacket & { total: number; };

export default class RClient {

    private conn = pool;

    constructor(conn = null) {

        if (conn) this.conn = conn;
        else this.conn = pool;

    }

    getAll = async (data: Context): Promise<CollectionResult<Client>> => {

        const sqlT = selectBuilder()
            .select(SQL`COUNT(*) AS total`)
            .from(clients)
            .where(clients, data.filters)
                .end()
            .build();

        const [total] = await this.conn.query<CountRow[]>(sqlT);

        const sql = selectBuilder()
            .select(selectAll(clients, {as:false}))
            .from(clients)
            .where(clients, data.filters)
                .end()
            .build();

        const [rows] = await this.conn.query<CLIENT[]>(sql);

        return { rows, total: Number(total[0]?.total ?? 0) };
    }

}
