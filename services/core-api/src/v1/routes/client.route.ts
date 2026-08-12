import { validate } from '../../middlewares/validate.middleware.js';
import { getClientParamsDTO } from '../dtos/client.dto.js';
import { getClientById, listClients } from '../controllers/client.controller.js';

const client = (router: any) =>
    router
        .get('/client', listClients)
        .get('/client/:id', validate({ params: getClientParamsDTO }), getClientById)

export default client;
