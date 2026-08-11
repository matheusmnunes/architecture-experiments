import {get} from '../services/address.service.js';

const address = (router: any) => 
    router
        .get('/address/:clientId', async(ctx:any) => {
            ctx.body = await get(Object.assign(ctx.params,ctx.query));
        })

export default address;
