import * as fs from 'fs';
import * as crypto from 'crypto';
import { fileURLToPath } from 'node:url';
import * as path from 'path';

const host = process.env.PDF_HOST;

if (!host) {
  throw new Error(
    'PDF_HOST environment variable is required',
  );
}

const moduleDirectory = path.dirname(
  fileURLToPath(import.meta.url),
);

type PDF = {
    html?:string,
    link?:string,
    footer:string,
    header:string,
    security?:{
        password?: string,
        print   ?: string,
        modify  ?: string
    }
}

const pdf = async (data: PDF): Promise<string> => {
    /*const html = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <title>Relatório do Cliente</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
          ${data.css}
        </head>
        ${data.html}
        </html>
    `;*/

    const body = {
        html: data.html,
        link: data.link,
        config: {
            options: {
                format   : "A4",
                landscape: true,
                margin   : {
                    top   : "30mm",
                    bottom: "30mm",
                    right : "15mm",
                    left  : "15mm"
                },
                footer: data.footer,
                header: data.header
            }
        },
        security: data.security
    }

    const response = await fetch(`http://${host}/pdf`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(body)
    });

    if (!response.ok) {
        throw new Error(`Erro ao gerar PDF: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);

    const fileName  = `${crypto.randomBytes(16).toString('hex')}.pdf`;
    const cachePath = process.env.CACHE_PATH ?? path.resolve(moduleDirectory, '../../cache');

    if (!fs.existsSync(cachePath)) {
        fs.mkdirSync(cachePath, { recursive: true });
    }

    fs.writeFileSync(path.join(cachePath, fileName), buffer);

    return fileName;
}

export default pdf