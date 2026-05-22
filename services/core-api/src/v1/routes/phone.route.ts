import {get, insert, update} from '../services/phone.service';

const phone = (router: any) => 
    router
        .get('/phone/:clientId/phones', async(ctx:any) => {
            ctx.body = await get(Object.assign(ctx.params,ctx.query));
        })
        .post('/phone', async(ctx:any) => {
            ctx.body = await insert(ctx.request.body);
        })
        .put('/phone/:id', async(ctx:any) => {
            ctx.body = await update(Object.assign(ctx.params, ctx.request.body));
        })

export default phone;