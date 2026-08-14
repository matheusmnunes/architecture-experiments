import Koa, {Next} from 'koa';
import Router,  { RouterContext } from '@koa/router';
import controllers from './controllers.js';
import bodyParser from 'koa-bodyparser';
import { query } from './middlewares/input.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { response } from './middlewares/response.middleware.js';

//import bodyParser from 'koa-bodyparser';

const port = process.env.API_PORT;
const host = process.env.API_HOST;

const app    = new Koa();
const router = new Router({
  prefix   : '/api/v1',
  exclusive: true,
  host     : `${host}:3000`
});


controllers.forEach((c: any) => c(router));

app
.use(async (ctx: RouterContext, next: Next) => {
  console.log(`Request: ${ctx.method} ${ctx.url}`);
  await next();
})
.use(errorHandler)
.use(response)
.use(bodyParser())
.use(query)
.use(router.routes())
.use(router.allowedMethods());

router.stack.forEach((r: any) => {
  console.log(`Carregando rota: ${r.path} - ${r.methods}`);
});

app.listen(process.env.API_PORT, () => {
  console.log(`Server running on http://${host}:${port}`);
});
