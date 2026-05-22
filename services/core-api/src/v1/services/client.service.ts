import RClient from '../repositories/client-repository';

const get = async (data: any) => {
    let clients = new RClient();
    return await clients.getAll(data);
 }

export {
    get
}

