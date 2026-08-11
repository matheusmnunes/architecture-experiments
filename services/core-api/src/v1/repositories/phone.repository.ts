import pool from '../../util/db/mysql.js';
import {phones} from '../../domain/schema/phone.schema.js';
import { translator, next_i18nID } from '../../util/translation.util.js';
import { select, insert, selectAs, join, where, all, empty,concat,pick } from '@vanit-co/sql-ts' 

export default class RPhone {

    private conn = pool;

    constructor(conn = null){

        if(conn) this.conn = conn;
        else this.conn = pool;

    }

    getAll = async (data:any) => {
        const sql = select`SELECT ${all(phones)}, t.text AS type FROM ${phones} 
                            INNER JOIN phone_type_params p ON p.id = ${phones.id_phone_type}
                            INNER JOIN parameter_translation t ON t.i18n_id = p.i18n_id AND t.lang = ${data.lang}
                            WHERE ${phones.id_client} = ${data.clientId}`;
        
        const [rows] = await this.conn.query(sql);
        return rows;
    }

    insert = async (data:any) => {
    

        
    }

    update = async (data:any) => {
        
    }

}
