import RPhone from '../repositories/phone-repository';

const get = async (data: any) => {
    let phone = new RPhone();
    return await phone.getAll(data);
 }

const insert = async (data: any) => {
   let phone = new RPhone();
   return await phone.insert(data);
}

const update = async (data: any) => {
   let phone = new RPhone();
   return await phone.update(data);
}

export {
    get,
    insert,
    update

}

