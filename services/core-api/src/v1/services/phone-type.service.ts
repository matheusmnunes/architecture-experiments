import RPhoneType from '../repositories/phone-type.repository.js';

const get = async (data: any) => {
    let phone = new RPhoneType();
    return await phone.getAll(data);
 }

const insert = async (data: any) => {
   let phone = new RPhoneType();
   return await phone.insert(data);
}

const update = async (data: any) => {
   let phone = new RPhoneType();
   return await phone.update(data);
}

export {
    get,
    insert,
    update
}
