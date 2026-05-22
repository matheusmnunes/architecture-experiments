import RClient from '../repositories/client-repository';
import RPhone from '../repositories/phone-repository';
import RAddress from '../repositories/address-repository';
import RReport from '../repositories/report-repository';
import {clients, client} from '../../domain/models/client.entity';
import pdf from '../../util/easy-pdf.util';
import RHeader from '../repositories/header-repository';
import RFooter from '../repositories/footer-repository';
import { replaceTableBlock } from '../../util/template.util';

let lang = 'pt-BR'

const get = async (data: any) => {

    lang = data.lang || 'pt-BR';

    const x = new RReport();
    const a = new RClient();
    const b = new RPhone();
    const c = new RAddress();

    const h = new RHeader();
    const f = new RFooter();
    
    let template  = await x.getAll(data);
    let client    = await a.getAll({id : data.clientId});
    let phones    = await b.getAll(data);
    let addresses = await c.getAll(data);
    let header    = await h.getAll({id:1});
    let footer    = await f.getAll({id:1});
    
    const body = processHTML(template[0].html, client[0], phones, addresses)
    const j    = processHeaderFooter(header[0].html, footer[0].html);

    const z = {
        html  : body,
        footer: j.footer,
        header: j.header
    }

    return pdf(z);
    
 }

 const processHTML = (template: string, client: any, phones: any, address: any):string => {
    
    let body = template;
    
    
    body = body.replace('{:NAME}'           , client.name);
    body = body.replace('{:EMAIL}'          , client.email);
    body = body.replace('{:CPF_CNPJ}'       , client.cpf_cnpj);
    body = body.replace('{:PERSON_TYPE}'    , client.person_type == 'F' ? 'Feminino' : 'Masculino');
    body = body.replace('{:BIRTH_DATE}'     , (new Date(client.birth_date)).toLocaleDateString(lang));
    body = body.replace('{:ACTIVE}'         , client.active ? 'Ativo' : 'Inativo');
    
    body = replaceTableBlock(body, phones,'PHONE');
    body = replaceTableBlock(body, address,'ADDRESS');
    
    return body; 
 }

 const processHeaderFooter = (header:string,footer:string) =>{

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

export {
    get
}

