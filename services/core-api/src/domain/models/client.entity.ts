import { schema, sql, all } from '@vanit-co/sql-ts';
import { phone } from './phone.entity'

const columns = [
    'id', 'name', 'email', 'cpf_cnpj', 'person_type', 'birth_date', 'active', 'created_at', 'updated_at', 'erased'
];

const clients = schema({table : 'clients', columns: columns, alias: 'c'});




type client = {
    id         : number,
    name       : string,
    email      : string,
    cpf_cnpj   : string,
    person_type: string,
    birth_date : Date,
    active     : boolean,
    created_at : Date,
    updated_at : Date,
    phones     : Array<phone> | []
}

class Client {
    constructor(data:client
    ){}

    addPhone = (phones:Array<phone>):void => {

        //TODO: CHAMAR UM util para formatar numeros
    }
}

export {clients , client};
