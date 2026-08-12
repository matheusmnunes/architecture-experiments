import {get} from '../services/report.service.js';

const report = (router: any) => 
    router
        .get('/report-pdf/:id', async(ctx:any) => {
            
            ctx.body = await get(Object.assign(ctx.params,ctx.query));
        })

export default report;
