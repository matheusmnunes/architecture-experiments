import {get} from '../services/client.service';

const client = (router: any) => 
    router
        .get('/client', async(ctx:any) => {
          ctx.body = await get(ctx.params);
        })
        .get('/client/:id', async(ctx:any) => {
          ctx.body = await get(ctx.params);
        })

export default client;