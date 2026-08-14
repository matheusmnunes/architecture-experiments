import pool from './db/mysql.js';
import { RowDataPacket } from 'mysql2';

const translator = async(text: string, lang?:string, langs?: Array<string>) => {
    
    const KEY    = process.env.TRANSLATION_KEY;
    const DEV    = process.env.DEV === 'true';
    const devUrl = process.env.TRANSLATION_DEV_URL;

    const languages = langs || ['pt-BR','es-ES','en-US', 'de-DE'];
    const language = lang || 'pt-BR';
    let result:Array<{lang:string, text: string}> = [];
    
    if(DEV){
        if (!devUrl) {
          throw new Error( 'TRANSLATION_DEV_URL is required' );
        }

        const response = await fetch(devUrl, {
            method : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body   : JSON.stringify({
                text     : text,
                source   : language,
                languages: languages
            })
        });

        if (!response.ok) {
                throw new Error(`Erro na tradução: ${response.status} ${response.statusText}`);
            }
        
        const x = await response.json();
        
        result = x;

    }else{
    
        for (const el of languages) {
            if(el === language) {
                result.push({ lang: el, text: text });

                continue;
            }

            const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${KEY}`, {
                method : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body   : JSON.stringify({
                    q     : text,
                    source: lang,
                    target: el,
                    format: 'text'
                })
            });
        
            if (!response.ok) {
                throw new Error(`Erro ao tradução: ${response.status} ${response.statusText}`);
            }
        
            const x = await response.json();

            result.push({lang:el, text:x.data.translations[0].translatedText});
        }
    }

    
    return result;
}

const next_i18nID = async () => {
    const sql    = `SELECT MAX(i18n_id + 1) max_i18n_id FROM systems.parameter_translation`;
    const [rows] = await pool.query<RowDataPacket[number]>(sql);

    return rows[0].max_i18n_id;
}


export {
    translator,
    next_i18nID
}
