import { validate } from '../../middlewares/validate.middleware.js';
import { getClientPhoneParamsDTO } from '../dtos/client-phone.dto.js';
import { listPhones } from '../controllers/client-phone.controller.js';

const phone = (router: any) => 
    router
        //.get('/phone/:clientId/phones', validate({ params: getClientPhoneParamsDTO }), listPhones)
        .get('/phone/:client_id/phones', validate({ params: getClientPhoneParamsDTO }), listPhones)
        .post('/phone', async(ctx:any) => {
            //ctx.body = await insert(ctx.request.body);
        })
        .put('/phone/:id', async(ctx:any) => {
            //ctx.body = await update(Object.assign(ctx.params, ctx.request.body));
        })

export default phone;
