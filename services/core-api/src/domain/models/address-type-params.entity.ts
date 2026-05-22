import { schema, sql, all } from '@vanit-co/sql-ts';

const columns = [
    'id', 'i18n_id','text', 'code', 'erased'
];

const address_types = schema({table : 'address_type_params', columns: columns, alias: 'atp'});

type address_type = {
    id     : number,
    i18n_id: number,
    text   : string,
    code   : string,
}

export {
    address_types,
    address_type
};
