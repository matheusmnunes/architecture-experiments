import RAddress from '../repositories/client-address.repository.js';

const get = async (data: any) => {
    let address = new RAddress();
    return await address.getAll(data);
 }

export {
    get
}
