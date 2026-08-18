import type { RouterContext } from '@koa/router';
import {get, insert,update} from '../services/phone-type-param.service.js';
import { listPhonesType } from '../controllers/phone-type-param.controller.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { getParamsDTO } from '../dtos/parameter.dto.js';


const phoneType = (router: any) => 
    router
        .get('/phonetype', listPhonesType)
        .get('/phonetype/:id', validate({params: getParamsDTO}), listPhonesType)
        
        //.post('/phonetype', async(ctx:RouterContext) => {
        //    const res = await insert(ctx.request.body);
        //    ctx.body =  {success: res.affectedRows > 0 , id: res};
        //})
        //.put('/phonetype/:i18n_id', async(ctx:RouterContext) => {
        //    const res = await update(Object.assign(ctx.params, ctx.request.body));
        //    ctx.body =  {success: res };
        //})

export default phoneType;
