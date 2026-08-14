import pool from '../../util/db/mysql.js';
import { SQL, bind } from 'sql-string-ts' 
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

    getAll = async (idTemplate: number):Promise<ReportTemplate[]> => {
        const sql = SQL`SELECT id, html FROM clients_report_templates WHERE erased = 0 AND id = ${bind(idTemplate)}`;
        const [rows] = await this.conn.query<ReportTemplate[]>(sql);
        
        return rows;
    }

}
