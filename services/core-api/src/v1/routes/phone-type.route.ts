import type { RouterContext } from '@koa/router';
import {get, insert,update} from '../services/phone-type.service.js';


const phone = (router: any) => 
    router
        .get('/phonetype', async(ctx:RouterContext) => {
            ctx.body = await get(ctx.state.input.query ?? {});
        })
        .get('/phonetype/:id', async(ctx:RouterContext) => {
            ctx.body = await get(Object.assign(ctx.params,ctx.query));
        })
        .post('/phonetype', async(ctx:RouterContext) => {
            const res = await insert(ctx.request.body);
            ctx.body =  {success: res.affectedRows > 0 , id: res};
        })
        .put('/phonetype/:i18n_id', async(ctx:RouterContext) => {
            const res = await update(Object.assign(ctx.params, ctx.request.body));
            ctx.body =  {success: res };
        })

export default phone;
