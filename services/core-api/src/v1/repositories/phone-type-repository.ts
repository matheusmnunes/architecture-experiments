import pool from '../../util/db/mysql';
import {phones} from '../../domain/models/phone.entity';
import { translator, next_i18nID } from '../../util/translation.util';
//import { select, insert, selectAs, join, where, all, empty,concat,pick } from '@vanit-co/sql-ts' 
import { parameterTranslation } from '../../domain/models/parameter-translation.entity';
import { selectAll, select, SQL} from 'sql-string-ts';
import { generateJoin, selectBuilder, insertBuilder,updateBuilder,deleteBuilder} from '../../util/query-builder-sql-string';

export default class RPhoneType {

    private conn: any;

    constructor(conn = null){

        if(conn) this.conn = conn;
        else this.conn = null;

    }

    getAll = async (data:any) => {

        const joins = [
          {table:parameterTranslation, join:'INNER JOIN', foreignkey:SQL`p.i18n_id`}
        ];
        
        const sql = selectBuilder()
            .select([SQL`p.id, t.i18n_id, t.text`,selectAll(parameterTranslation,{as :false})])
            .from(SQL`phone_type_params p`)
            .joins(joins)
                .end()
            .where(parameterTranslation, data)
                .end()
            .groupBy(SQL`p.id, t.i18n_id, t.text`,parameterTranslation.lang)
            .having(SQL`p.id > 1`)
            .sort(
                {column:SQL`p.id`, direction:'ASC'},
                {column:parameterTranslation.lang, direction:'DESC'}
            )
            .pagination(data.start, data.limit)
            .build()

        //const sql = buildInsert()
        //    .into(parameterTranslation)
        //    .values(data)
        //    .build()

        //const sql = updateBuilder()
        //    .table(parameterTranslation)
        //    .set({text:'teste', erased:1})
        //    .where({id: 2})
        //        .end()
        //    .build();

        //const sql = deleteBuilder({alias:true, quote:true})
        //    .from(parameterTranslation)
        //    .where({id: 2})
        //        .end()
        //    .build();

        console.log(sql.text)
        //if(!this.conn) this.conn = await pool.getConnection();
        //const sql = select`SELECT p.id, t.i18n_id, t.text FROM phone_type_params p
        //                    INNER JOIN parameter_translation t ON t.i18n_id = p.i18n_id AND t.lang = ${data.lang}`;
        //
        //try{
        //const [rows] = await this.conn.query(sql);
        //    return rows;
        //} catch (err) {
        //    throw err;
        //} finally {
        //    this.conn.release();
        //}
    }

    insert = async (data:any) => {
        if(!this.conn) this.conn = await pool.getConnection();
        const i18n_id = await next_i18nID();
        const a       = await translator(data.text, data.lang);
        
        await this.conn.beginTransaction();

        try {
            for (const element of a) {
                const sql = `INSERT INTO systems.parameter_translation (text, lang, i18n_id, namespace)
                                VALUES (?,?,?,?)`;
                await this.conn.query(sql, [
                    element.text,
                    element.lang,
                    i18n_id,
                    'phone_type_params'
                ]);
            };

            const sql = `INSERT INTO phone_type_params (text,i18n_id) VALUES (?,?)`;
            const [res] = await this.conn.query(sql, [data.text, i18n_id]);

            await this.conn.commit();
            return res.insertId;
        } catch(err) {
            await this.conn.rollback();
            
            throw err;
        }finally {
            this.conn.release();
        }
    }

    update = async (data:any) => {
        if(!data.i18n_id) throw new Error('i18n_id is required');

        if(!this.conn) this.conn = await pool.getConnection();
        const i18n_id = data.i18n_id;
        const a       = await translator(data.text, data.lang);

        await this.conn.beginTransaction();

        let success = false;

        try {
            for (const element of a) {
                const sql = `UPDATE systems.parameter_translation SET text = ? WHERE i18n_id = ? AND lang = ?`;
                await this.conn.query(sql, [
                    element.text,
                    i18n_id,
                    element.lang
                ]);
            };

            await this.conn.commit();
            return true;
        } catch(err) {
            await this.conn.rollback();
            
            throw err;
        }finally {
            this.conn.release();
        }
    }

}

