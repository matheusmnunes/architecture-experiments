import { SQL, empty, bind, Schema, ColumnMeta, Columns, t, c} from 'sql-string-ts';

type EnumType = Record<string, string | number>;

type TableColumns<T> = Record<keyof T, ColumnMeta<T>>;

export type Join = {
  table: Schema<EnumType>,
  primaryKey?: ColumnMeta<EnumType>,
  operator?: string,
  join?: string,
  foreignkey: ColumnMeta<EnumType>,
  useFindInSet?: boolean
};

type Tables<T> = Schema<T> | Array<Schema<T>>;

type Fragment = typeof empty;

type Data = Record<string, string | number >;

//EXEMPLOS DE USO
/*const composeGetAll = (filters, table) => {
  return new Promise((resolve, reject) => {
    try {
      const a = SQL`select`;
      resolve(a);
    } catch (e) {
      reject(e);
    }
  });
};*/

/*
  compose()
    .then((x) => x.concat(generateColumns(selectAll(table))))
    .then((x) => x.concat(SQL` from ${table}`))
    .then((x) => x.concat(generateFilters(filters, table)))
    .then((x) => x.concat(additionalFilters(['password'], filters, table)))
    //.then( x => x.concat(getRawFilters(SQL ` AND ${getAlias(user)}.password = ${bind(data.password)}`,data)) )
    .then((x) => console.log(x.sql));
*/

/*const joins = [
    {table:user, join:'innerJoin', foreignkey:user.id},
    {table:user, foreignkey:user.id}
  ];*/

/*const filters = getRawFilters(SQL ` AND ${getAlias(user)}.password = ${bind(data.password)}`,data);
  console.log(filters);*/
/**
 * Retorna um SELECT completo
 * @param table Tabela
 * @param columns Colunas das tabelas
 * @param data Dados do request
 * @param joins Joins
 * @param filters Fragment de filtros
 * @param sort Fragment de sort
 * @returns Fragment
 */
const buildPartsGet = <T>(table: TableColumns<Columns>, columns: Fragment | Array<Fragment>, data = {}, joins: Join[], filters = empty, sort = empty): Fragment => {
  return buildGetAll(generateColumns, generateJoins)(table, columns, data, joins, filters, sort);
};

const buildGetAll = (fn1: (x:Fragment | Array<Fragment>) => Fragment, fn2 = null) => {
  return <T>(table: TableColumns<T>, columns: Fragment | Array<Fragment>, data: EnumType = {}, joins: Join[], filters = empty, sort = empty):Fragment => {
    let query = SQL`SELECT ${fn1(columns)} FROM ${table} `;

    if (fn2) query = query.concat(fn2(joins));
    query = query.concat(filters);
    query = query.concat(sort);

    return query;
  };
};

/**
 * Gera os joins formatados
 * @param joins Joins da tabela
 * @returns Fragmentos
 */
const generateJoins = (joins: Join[]): Fragment => {
  return joins.length === 0
    ? empty
    : joins.reduce(
        (a, x) => a.concat( x.useFindInSet ? findInSetJoin(x) : defaultJoin(x) ), empty
      );
};

const defaultJoin = (x:Join) => {
  //  console.log(x.table);
  
  // console.log(SQL`${x.join ? x.join : ' LEFT JOIN'} ${x.table} ON ${x.primaryKey ? x.primaryKey : x.table.id} ${x.operator ? x.operator : '='} ${x.foreignkey} `);
  // return ""
  return SQL`${x.join ? x.join : ' LEFT JOIN'} ${x.table} ON ${x.primaryKey ? x.primaryKey : x.table.id} ${x.operator ? x.operator : '='} ${x.foreignkey} `
}

const findInSetJoin = (x) => {
  return SQL`${x.join ? x.join : ' LEFT JOIN'} ${x.table} ON FIND_IN_SET(${ x.primaryKey ? x.primaryKey : x.table.id }, ${x.foreignkey}) `
}

/**
 * Gera as colunas das tableas
 * @param columns Colunas das tabelas
 * @returns Fragmentos
 */
const generateColumns = (columns: Fragment | Array<Fragment>): Fragment => {
  if (Array.isArray(columns)) {
    const count = columns.length;
    return columns.reduce(
      (a, x, i) => a.concat(x).concat(i < count - 1 ? ',' : ' '),
      empty,
    );
  }
  return columns;
};

/**
 * Gera os filtros de acordo com os campos presentes na tabela. Um array de tabelas pode ser passado. 
 * Obs.: Necessário existir o filters no request
 * @param data Dados do request
 * @param tables Tabela do modelo
 * @param defaultFilters Objeto com filtros padrões. Ex: {erased:0, active:1}
 * @returns Fragmento
 */
const generateFilters = <T>(tables: Tables<T>, filters?: EnumType, config = {prefix:true, quote: true}): Fragment => {
  if(!filters) return empty;

  const fields = Object.keys(filters); 

  if(fields.length === 0) return empty;
  
  const t = !Array.isArray(tables) ? [tables] : tables;
  const where = empty;

  const f = filters;
  let final = empty;

  t.forEach((table, i) => {
    final = final.concat(
      fields.map( (x) => table.hasOwnProperty(x) ? SQL`${c(table[x], config)}`.concat(table[x] ? SQL` = ${bind(f[x])}` : empty) : empty )
      .reduce((a, x, i) => a.concat(x.strings[0] ? SQL` AND ${x}` : empty))
    );
  });

  return where.concat(final.strings[0] ? SQL` `.concat(final) : empty);
};

/**
 * Gera filtros com os campos desejados a partir de um array. Ideal para campos não presentes no modelo da tabela, mas que cheguem no request.
 * Obs.:Sempre passar os campos com alias. Ex.: ['alias1.field1','alias1.field2','alias2.field1']
 * @param array Lista de campos desejados
 * @param data Dados do request
 * @returns Fragmento
 */
const additionalFilters = (array: Array<string>, data?: EnumType): Fragment => {
  if (array.length === 0) return empty;

  const filters = data.filters;
  const final = array
    .map((x) => {
      const field = x.split('.');
      return filters[field[1]] ? SQL` ${x} = ${bind(filters[field[1]])}` : empty;
    })
    .reduce((a, x, i) => a.concat(x.strings[0] ? x : empty));

  return final.strings[0] ? final : empty;
};

/**
 * Retorna um Fragmento passado. Ex.: SQL` AND alias1.field1 AND alias1.field2`
 * @param rawFilters Fragmento puro.
 * @returns Fragmento
 */
const getRawFilters = (rawFilters = empty): Fragment => {
  return rawFilters;
};

const searchFilter = (table, json, config = {prefix: true, quote: true}) => {
  if(Object.keys(json).length === 0) return empty
  const filters = json.property.split(',')

  const value = bind("%"+json.value+"%")
  
  //Por algum motivo passando string diretamente no bind não está rolando
  const where = SQL`(`.concat(filters.map(x => SQL`${c(table[x.trim()],config)} LIKE ${value}`).reduce((a, x) => a.concat(SQL` OR ${x}`))).concat(SQL`)`)

  return where
}

const setFilters = <T>(tables: Tables<T>, joins: Join[],filters?: EnumType, addFilters = [], raw = empty, filter = {},  config = {prefix: true, quote:true}) => {
  const f = []
  
  f.push(generateFilters(tables, filters, config))
  f.push(generateFilters(extractTableJoins(joins), filters, config))
  f.push(additionalFilters(addFilters, filters))
  f.push(getRawFilters(raw))
  f.push(searchFilter(tables,filter))
  
  const filtered = f.filter(x => { if(x.strings[0]) return x })
  const where = filtered.length > 0 ? filtered.reduce((a,x) => a.concat(SQL` AND ${x}`)) : empty

  return where.strings[0] ? SQL` WHERE ${where}` : empty;
};

const groupBy = (field) => {
  return field ? SQL` GROUP BY ${field}` : empty
}

//type Sort = {property:ColumnMeta<EnumType>, value?: 'ASC' | 'DESC'}
type Sort = {property: string, value?: 'ASC' | 'DESC'} //TODO: quando tiver o front-end estudar possibilidade de enviar um ColumnMeta em property

type Pagination = {
  start,
  limit
}
/**
 * Gera um sort
 * @param table Tabela do modelo
 * @param sort Objeto com o campo e valor. {property: <campo>, value: <DESC/ASC>}
 * @return Fragment
 */
const generateSort = (sort:Sort ): Fragment => {
  return sort && sort.property ? SQL` ORDER BY ${sort.property} ${sort.value??empty}` : empty
}
/**
 * Gera um sort
 * @param pagination 
 * @return Fragment
 */
const generatePagination = (pagination:Pagination ): Fragment => {
  return pagination ? SQL` LIMIT ${pagination.start} ,${pagination.limit}` : empty
}


/**
 * Gera os binds do INSERT de acordo com os campos que chegaram e se estão presentes na tabela
 * @param data Dados do request
 * @param table Tabela
 * @returns Fragmento
 */
const setBindValuesInsert = (data: Data, table: TableColumns<Columns>): Fragment => {
  if(data.hasOwnProperty('erased')) delete data.erased
  const colsForInsert = Object.keys(data).map((x) => table[x]).filter((x,i)=> {if(x !== undefined) return x} );
  const count = colsForInsert.length;
  const bindValuesForInsert = SQL`(`
    .concat(
      colsForInsert
        .map((x) => SQL`${c(table[x.name])}`)
        .reduce((a, x, i) => a.concat(i < count ? ', ' : empty).concat(x)),
    )
    .concat(') VALUES (')
    .concat(
      colsForInsert
        .map((x) => SQL`${bind(data[x.name])}`)
        .reduce((a, x, i) => a.concat(i < count ? ', ' : empty).concat(x)),
    )
    .concat(')');

  return bindValuesForInsert;
};

/**
 * Constrói o INSERT
 * @param data Dados do request
 * @param table tabela
 * @returns Fragmento
 */
const buildInsert = (data: Data, table: TableColumns<Columns>): Fragment => {
  const query = SQL`INSERT INTO ${t(table)} ${setBindValuesInsert(data, table)}`;
  //console.log(query.sql,query.values)
  return query;
};

/**
 * Gera os binds do UPDATE de acordo com os campos que chegaram e se estão presentes na tabela
 * @param data Dados do request
 * @param table Tabela
 * @returns Fragmento
 */
const setBindValuesUpdate = (data: Data, table: TableColumns<Columns>): Fragment => {
  const colsForUpdate = Object.keys(data).map((x) => table[x]).filter((x,i)=> {if(x !== undefined) return x} );
  const count = colsForUpdate.length;
  
  const bindValuesForUpdate = colsForUpdate
    .map((x) => SQL`${c(table[x.name])} = ${bind(data[x.name])}`)
    .reduce((a, x, i) => a.concat(i < count ? ', ' : empty).concat(x));

  return bindValuesForUpdate;
};

/**
 * Constrói o UPDATE
 * @param data Dados do request
 * @param table Tabela
 * @param config Recebe um Schema e retorna o nome da coluna (usado para filtros). Padrão {prefix:false}
 * @returns Fragmento
 */
const buildUpdate = (data, filters, table: TableColumns<Columns>, config = {prefix:false, quote:true}) => {
  const query = SQL`UPDATE ${t(table)}  SET ${setBindValuesUpdate(data, table)} WHERE ${generateFilters(table, filters, config)}`;
  
  return query;r
};

/**
 * Constrói o DELETE
 * @param id ID do registro
 * @param table Tabela
 * @returns Fragmento
 */
const buildDelete = (id: number, table: TableColumns<Columns>): Fragment => {
  const query = SQL`UPDATE ${t(table)} SET ${c(table.erased)} = ${bind(1)} WHERE id = ${bind(id)}`;

  return query;
};

/**
 * Retorna um array de tabelas usadas para compor os joins
 * @param joins Joins
 * @returns Array
 */
const extractTableJoins = (joins: Join[]) => {
  return joins.length != 0 ? joins.map((j) => j.table) : [];
};

export {
  generateJoins,
  generateFilters,
  generatePagination,
  generateColumns,
  additionalFilters,
  getRawFilters,
  buildGetAll,
  buildPartsGet,
  buildInsert,
  buildUpdate,
  buildDelete,
  setFilters,
  generateSort,
  setBindValuesInsert,
  setBindValuesUpdate,
  Sort,
  EnumType,
  groupBy
};

