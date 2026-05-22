import { schema, sql, all } from '@vanit-co/sql-ts';

const columns = [
    'id', 'id_client', 'id_address_type', 'street', 'number', 'complement', 'reference', 'zip_code', 'id_city', 'id_state', 'erased'
];

const addresses = schema({table : 'clients_addresses', columns: columns, alias: 'ca'});

type address = {
    id             : number,
    id_client      : number,
    id_address_type: number,
    street         : string,
    number         : string,
    complement     : string,
    reference      : string,
    zip_code       : string,
    id_city        : string,
    id_state       : string,
}

class ClientAddress {
    //constructor(data:phone
    //){}
}

export {
    addresses,
    address,
    ClientAddress
};
