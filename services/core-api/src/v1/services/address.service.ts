import RAddress from '../repositories/address.repository.js';

const get = async (data: any) => {
    let address = new RAddress();
    return await address.getAll(data);
 }

export {
    get
}
