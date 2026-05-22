import { schema, sql, all } from '@vanit-co/sql-ts';

const columns = [
    'id', 'id_client', 'id_phone_type', 'number', 'main', 'erased'
];

const phones = schema({table : 'clients_phones', columns: columns, alias: 'cp'});

type phone = {
    id           : number,
    id_client    : string,
    id_phone_type: string,
    number       : string,
    main         : string,
}

class Phone {
    constructor(data:phone
    ){}
}

export {
    phones,
    phone,
    Phone
};
