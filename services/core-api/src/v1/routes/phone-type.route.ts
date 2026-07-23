import {get, insert,update} from '../services/phone-type.service';


const phone = (router: any) => 
    router
        .get('/phonetype', async(ctx:any) => {
            ctx.body = await get(Object.assign(ctx.params,ctx.query));
        })
        .get('/phonetype/:id', async(ctx:any) => {
            ctx.body = await get(Object.assign(ctx.params,ctx.query));
        })
        .post('/phonetype', async(ctx:any) => {
            const res = await insert(ctx.request.body);
            ctx.body =  {success: res.affectedRows > 0 , id: res};
        })
        .put('/phonetype/:i18n_id', async(ctx:any) => {
            const res = await update(Object.assign(ctx.params, ctx.request.body));
            ctx.body =  {success: res };
        })

export default phone;