import RClient from '../repositories/client.repository.js';
import RPhone from '../repositories/client-phone.repository.js';
import RAddress from '../repositories/client-address.repository.js';
import RReport from '../repositories/report.repository.js';
import pdf from '../../util/easy-pdf.util.js';
import RHeader from '../repositories/header.repository.js';
import RFooter from '../repositories/footer.repository.js';
import { replaceTableBlock } from '../../util/template.util.js';
import { Context } from '../../types/context.type.js';
import { Client } from '../../domain/schema/client.schema.js';
import { ClientPhone } from '../../domain/schema/client-phone.schema.js';
import { ClientAddress } from '../../domain/schema/client-address.schema.js';

export type GeneratedReport = {
  fileName    : string
};

export const generate = async (data: Context): Promise<GeneratedReport> => {

    if (!data || !data.filters)
      throw new Error( 'Filters is required' );

    const lang = typeof 
        data.filters?.lang === 'string' 
            ? data.filters?.lang 
            : 'pt-BR';
    
    const client_id  = data.filters.client_id as number;
    const idTemplate = data.filters.id as number;

    const x = new RReport();
    const a = new RClient();
    const b = new RPhone();
    const c = new RAddress();

    const h = new RHeader();
    const f = new RFooter();

    let template  = await x.getAll(idTemplate);
    let client    = await a.getAll({filters:{id: client_id, lang: lang}});
    let phones    = await b.findByClientIds([client_id], lang);
    let addresses = await c.findByClientIds([client_id], lang);
    let header    = await h.getAll({id:1});
    let footer    = await f.getAll({id:1});
    
    const body = processHTML(template[0].html, lang, client.rows[0], phones, addresses)
    const j    = processHeaderFooter(header[0].html, footer[0].html, lang);

    const z = {
        html  : body,
        footer: j.footer,
        header: j.header
    }

    const fileName = await pdf(z);

    return { fileName }
    
    
 }

const processHTML = (
    template: string, lang: string, client: Client, phones: ClientPhone[], addresses: ClientAddress[]
):string => {
    
    let body = template;
    
    body = body.replace('{:NAME}'           , client.name);
    body = body.replace('{:EMAIL}'          , client.email);
    body = body.replace('{:CPF_CNPJ}'       , client.cpf_cnpj);
    body = body.replace('{:PERSON_TYPE}'    , client.person_type == 'F' ? 'Feminino' : 'Masculino');
    body = body.replace('{:BIRTH_DATE}'     , (new Date(client.birth_date)).toLocaleDateString(lang));
    body = body.replace('{:ACTIVE}'         , client.active ? 'Ativo' : 'Inativo');
    
    body = replaceTableBlock(body, phones,'PHONE');
    body = replaceTableBlock(body, addresses,'ADDRESS');
    
    return body; 
 }

 const processHeaderFooter = (header:string,footer:string, lang:string) =>{

    const now = new Date();
    const values: Record<string, string> = {
        '{:HEADER_SYSTEM_NAME}'  : 'Sistema de Relatórios',
        '{:HEADER_SUBTITLE}'     : 'Documento gerado automaticamente',
        '{:HEADER_DATE}'         : now.toLocaleDateString(lang, { day: '2-digit', month: 'long', year: 'numeric' }),
        '{:FOOTER_YEAR}'         : String(now.getFullYear()),
        '{:FOOTER_COMPANY}'      : 'Minha Empresa',
        '{:FOOTER_DOCUMENT_TYPE}': 'Documento confidencial',
        '{:FOOTER_DATETIME}'     : now.toLocaleString(lang)
    };

    let headerFinal = header;
    let footerFinal = footer;

    for (const [tag, value] of Object.entries(values)) {
        headerFinal = headerFinal.replace(tag, value);
        footerFinal = footerFinal.replace(tag, value);
    }

    return { header: headerFinal, footer: footerFinal };
 }

