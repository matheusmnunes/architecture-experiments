import { validate } from '../../middlewares/validate.middleware.js';
import { listAddresses } from '../controllers/client-address.controller.js';
import { getClientAddressParamsDTO } from '../dtos/client-address.dto.js';

const address = (router: any) => 
    router
        .get('/address', listAddresses)
        .get('/address/:client_id', validate({params: getClientAddressParamsDTO}), listAddresses)

export default address;
