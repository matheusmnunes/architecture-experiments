import RAddress from '../repositories/address-repository';

const get = async (data: any) => {
    let address = new RAddress();
    return await address.getAll(data);
 }

export {
    get
}

