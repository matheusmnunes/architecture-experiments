import pool from '../../util/db/mysql';
import { select, selectAs, join, where, all, empty,concat,pick } from '@vanit-co/sql-ts' 
import { RowDataPacket } from 'mysql2';

interface ReportTemplate extends RowDataPacket {
  id: number;
  html: string;
}

export default class RReport {

    private conn = pool;

    constructor(conn = null){

        if(conn) this.conn = conn;
        else this.conn = pool;

    }

    getAll = async (data:any):Promise<ReportTemplate[]> => {
        const sql = select`SELECT id, html FROM clients_report_templates WHERE erased = 0 and id = ${data.id}`;
        const [rows] = await this.conn.query<ReportTemplate[]>(sql);

        return rows;
        
        
    }

}

