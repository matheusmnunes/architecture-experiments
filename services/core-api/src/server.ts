import Koa, {Next} from 'koa';
import Router,  { RouterContext } from '@koa/router';
import controllers from './controllers';
import bodyParser from 'koa-bodyparser';

//import bodyParser from 'koa-bodyparser';

const app    = new Koa();
const router = new Router({
  prefix   : '/api/v1',
  exclusive: true,
  host     : 'localhost:3000'
});

controllers.forEach((c: any) => c(router));

app
.use(async (ctx: RouterContext, next: Next) => {
  console.log(`Request: ${ctx.method} ${ctx.url}`);
  await next();
})
.use(bodyParser())
.use(router.routes())
.use(router.allowedMethods());

router.stack.forEach((r: any) => {
  console.log(`Carregando rota: ${r.path} - ${r.methods}`);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});