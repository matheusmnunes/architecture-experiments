import pool from '../../util/db/mysql';
import {clients, client} from '../../domain/models/client.entity';
import { select, selectAs, join, where, all, empty } from '@vanit-co/sql-ts' 
import { RowDataPacket } from 'mysql2';

type CLIENT = client & RowDataPacket;

export default class RClient {

    private conn = pool;

    constructor(conn = null){

        if(conn) this.conn = conn;
        else this.conn = pool;

    }

    getAll = async (data:any):Promise<client[]> => {
        const sql = select`SELECT ${all(clients)} FROM ${clients}`
                    .append(data.id ? where`WHERE ${clients.id} = ${data.id}` : empty);
        const [rows] = await this.conn.query<CLIENT[]>(sql);
        
        return rows;
    }

}

