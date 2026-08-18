import type { RouterContext } from '@koa/router';
import { listAddressType } from '../controllers/address-type-param.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { getParamsDTO } from '../dtos/parameter.dto.js';


const addressType = (router: any) => 
    router
        .get('/addresstype', listAddressType)
        .get('/addresstype/:id', validate({params: getParamsDTO}), listAddressType)
        
        //.post('/phonetype', async(ctx:RouterContext) => {
        //    const res = await insert(ctx.request.body);
        //    ctx.body =  {success: res.affectedRows > 0 , id: res};
        //})
        //.put('/phonetype/:i18n_id', async(ctx:RouterContext) => {
        //    const res = await update(Object.assign(ctx.params, ctx.request.body));
        //    ctx.body =  {success: res };
        //})

export default addressType;
