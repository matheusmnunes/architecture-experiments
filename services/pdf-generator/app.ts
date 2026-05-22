import Koa from 'koa';
import Router,  { RouterContext } from '@koa/router';
import bodyParser from 'koa-bodyparser';
import { chromium, Browser } from 'playwright-core';
import genericPool from 'generic-pool';
import pino from 'pino';
import crypto from 'crypto';
// @ts-ignore
import * as qpdf from 'node-qpdf';
//import { promisify } from 'util';
import fs from 'fs';

const dir    = '/tmp/';
const file   = `${crypto.randomUUID()}.pdf`;
const app    = new Koa();
const router = new Router();
const logger = pino({ level: 'info', base: null });

//MEMORIA RECOMENDADA PARA ESSE CASO 4GB
const MIN_POOL = Number(process.env.MIN_POOL) ?? 2;
const MAX_POOL = Number(process.env.MAX_POOL) ?? 5;
const ATM      = Number(process.env.ATM) ?? 30000; // tempo máximo para adquirir um browser do pool
const ITM      = Number(process.env.ITM) ?? 60000; // fecha browsers ociosos após 60s
const opts     = { min: MIN_POOL, max: MAX_POOL, acquireTimeoutMillis: ATM, idleTimeoutMillis: ITM };
//const encrypt       = promisify(qpdf.encrypt);

interface Options {
    format?            : string,
    displayHeaderFooter: boolean,
    landscape?         : boolean,
    margin?            : { top: string; right: string; bottom: string; left: string },
    footer?            : string,
    header?            : string
}

interface Security {
    password  : string,
    print?    : 'full' | 'low' | 'none',
    modify?   : 'all' | 'annotate' | 'form' | 'none',
    extract?  : 'y' | 'n',
    useAes?   : 'y' | 'n',
    annotate?: 'y' | 'n'
}

interface PdfRequest {
    html?  : string;
    link?  : string;
    config?: {
        options? : Options
        security?: Security
    }
}

const _options = (x?:Options)  => {
    return {
            displayHeaderFooter: true,
            format             : x?.format ?? 'A4',
            landscape          : x?.landscape ?? false,
            margin             : {
                top   : x?.margin?.top ?? '15mm',
                right : x?.margin?.right ?? '30mm',
                bottom: x?.margin?.bottom ?? '30mm',
                left  : x?.margin?.left ?? '15mm'
            },
            footerTemplate: x?.footer ?? "",
            headerTemplate: x?.header ?? ""
        }
}

const _security = (x:Security) => {
    return {
        keyLength   : '256',
        password    : x.password,
        restrictions: {
            print   : x?.print ?? 'full',
            modify  : x?.modify ?? 'all',
            extract : x?.extract ?? 'y',
            annotate: x?.annotate ?? 'y',
        }
    }
}

//cria um factory para o pool de browsers
const factory = {
  create: async () => {
    return await chromium.launch({
            executablePath: '/usr/bin/chromium', // ou outro browser que você instalou
            headless: true,
            args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
        });
  },
  destroy: async (browser: Browser) => {
    await browser.close();
  }
};

app.use(bodyParser());

// registar rota primeiro
router.post('/pdf', async(ctx: RouterContext) => {
    const { html, link, config } = ctx.request.body as PdfRequest;

    if(!html && !link){
        logger.info('CONTEÚDO NÃO INFORMADO');
        return;
    }

    //adquire um browser do pool
    const browser = await pool.acquire();

    if (!browser) {
        logger.error('BROWSER NÃO INICIALIZADO');
        ctx.status = 500;
        ctx.body   = 'Browser não pronto';
        return;
    }

    const page = await browser.newPage();
    logger.info('PÁGINA CRIADA');
    try{

        if(html){
            await page.setContent(html , { waitUntil: 'networkidle' });
        }else{
            try{
                await page.goto(link!);
            }catch{
                await page.setContent(fs.readFileSync(link!, 'utf8'), { waitUntil: 'networkidle' });
            }
        }

        let pdfPath = dir + file;
        
        await page.pdf({path: pdfPath ,..._options(config?.options)});
        
        if(config?.security){
            //usando promisify
            //await encrypt(tempPath, _security(config.security), protectedPath);
            pdfPath = `${dir}protected-${file}`;
            await qpdf.encrypt(dir + file, {outputFile: pdfPath, ..._security(config.security)});
                
            fs.unlinkSync(dir + file);
        }

        ctx.type = 'application/pdf';
        ctx.body = fs.readFileSync(pdfPath);
        fs.unlinkSync(pdfPath);

        //await browser.close();
        logger.info('PDF gerado em:'+ pdfPath)
        //console.log('PDF gerado em:', pdfPath);
    }catch (err) {
        logger.info('Erro gerado PDF:'+ err);
        ctx.status = 500;
        ctx.body   = 'Erro ao gerar PDF';
    }finally{
        await page.close();
        await pool.release(browser);
    }
});


//Depois o middleware
app.use(router.routes());
app.use(router.allowedMethods());


//Cria um pool de browsers
const pool = genericPool.createPool(factory, opts);

(async () => {
    try {
        
        logger.info('POOL INICIADO');
      
        app.listen(3001, () => {
            logger.info('SERVER LISTEN 3001');
        });
    
    } catch (err) {
        logger.error('ERRO AO INICIAR BROWSER:'+ err);
        process.exit(1);
    }finally{

    }
})();








