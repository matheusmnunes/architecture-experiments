import { SQL, select, empty, bind, Schema, ColumnMeta, Columns, t, c } from 'sql-string-ts';

type EnumType = Record<string, string | number>;

type TableColumns<T> = Record<keyof T, ColumnMeta<T>>;

type ColumnInput = Fragment | ColumnMeta<Columns>;
type ColumnsInput = ColumnInput | Array<ColumnInput>;

export type Join = {
    table: Schema<EnumType>,
    primaryKey?: ColumnMeta<EnumType> | Fragment,
    operator?: string,
    join?: string,
    foreignkey: ColumnMeta<EnumType> | Fragment,
    useFindInSet?: boolean
};

type Tables<T> = Schema<T> | Array<Schema<T>>;

type Fragment = typeof empty;

type Data = Record<string, string | number>;

type SearchFilter = {
    property: string;
    value: string | number;
};

//EXEMPLOS DE USO
/*const joins = [
    {table:user, join:'innerJoin', foreignkey:user.id},
    {table:user, foreignkey:user.id}
  ];*/

/*const filters = getRawFilters(SQL ` AND ${getAlias(user)}.password = ${bind(data.password)}`,data);
  console.log(filters);*/

/**
 * Gera os joins formatados
 * @param joins Joins da tabela
 * @returns Fragment
 */
const generateJoins = (joins: Join[]): Fragment => {
    return joins.length === 0
        ? empty
        : joins.reduce(
            (a, x) => a.concat(x.useFindInSet ? findInSetJoin(x) : defaultJoin(x)), empty
        );
};

const defaultJoin = (x: Join) => {
    //  console.log(x.table);

    // console.log(SQL`${x.join ? x.join : ' LEFT JOIN'} ${x.table} ON ${x.primaryKey ? x.primaryKey : x.table.id} ${x.operator ? x.operator : '='} ${x.foreignkey} `);
    // return ""
    return SQL`${x.join ? x.join : ' LEFT JOIN'} ${x.table} ON ${x.primaryKey ? x.primaryKey : x.table.id} ${x.operator ? x.operator : '='} ${x.foreignkey} `
}

const findInSetJoin = (x: Join) => {
    return SQL`${x.join ? x.join : ' LEFT JOIN'} ${x.table} ON FIND_IN_SET(${x.primaryKey ? x.primaryKey : x.table.id}, ${x.foreignkey}) `
}

const normalizeColumns = ( columns: Array<ColumnsInput> ): Array<ColumnInput> => {
    return columns.flat();
};

/**
 * Gera as colunas das tableas
 * @param columns Colunas das tabelas
 * @returns Fragmentos
 */
const generateColumns = (...columns: Array<ColumnsInput>): Fragment => {
    return generateColumnList( ...normalizeColumns(columns) );
    //if (Array.isArray(columns)) {
    //    const count = columns.length;
    //    return columns.reduce(
    //        (a, x, i) => a.concat(x).concat(i < count - 1 ? ',' : ' '),
    //        empty,
    //    );
    //}
    //return columns;
};

/**
 * Gera os filtros de acordo com os campos presentes na tabela. Um array de tabelas pode ser passado. 
 * Obs.: Necessário existir o filters no request
 * @param tables Tabela do modelo
 * @param filters Dados do request
 * @param defaultFilters Objeto com filtros padrões. Ex: {erased:0, active:1}
 * @returns Fragmento
 */
const generateFilters = <T>(tables: Tables<T>, filters?: EnumType, op = '=', config = { prefix: true, quote: true }): Fragment => {
    if (!filters) return empty;

    const fields = Object.keys(filters) as Array<keyof Schema<T>>;

    if (fields.length === 0) return empty;
    //console.log(fields)
    const t = !Array.isArray(tables) ? [tables] : tables;
    const where = empty;

    const f = filters;
    let final = empty;

    t.forEach((table, i) => {
        final = final.concat(
            fields.map((x) => Object.prototype.hasOwnProperty.call(table, x) ? SQL`${c(table[x], config)}`.concat(table[x] ? SQL` ${op} ${bind(f[x])}` : empty) : empty)
                .reduce((a, x, i) => a.concat(x.strings[0] ? SQL` AND ${x}` : empty))
        );
    });

    return where.concat(final.strings[0] ? SQL` `.concat(final) : empty);
};

/**
 * Gera filtros com os campos desejados a partir de um array. Ideal para campos não presentes no modelo da tabela, mas que cheguem no request.
 * Ex.:'alias1.field1','field2','alias2.field1'
 * @param array Lista de campos desejados
 * @param data Dados do request
 * @returns Fragmento
 */
const additionalFilters = (data: EnumType | undefined, ...array: Array<string> ): Fragment => {
    if (!data || array.length === 0) return empty;

    const final = array
        .map((x) => {
            const parts = x.split('.')!;
            const field = parts[parts.length - 1];
            const value = data[field];
            return value !== undefined ? SQL` ${x} = ${bind(value)}` : empty
        })
        .reduce((a, x, i) => a.concat(x.strings[0] ? x : empty), empty);

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


/**
 * 
 * @param table 
 * @param json 
 * @param config 
 * @returns 
 */
const searchFilter = <T>(tables: Tables<T>, json: SearchFilter, config = { prefix: true, quote: true }):Fragment => {
    if (Object.keys(json).length === 0) return empty

    const tableL  = Array.isArray(tables) ? tables : [tables];
    const filters = json.property.split(',').map(x => x.trim().split('.').pop()!);
    const value   = bind("%" + json.value + "%")

    //Por algum motivo passando string diretamente no bind não está rolando
    const where = tableL
        .flatMap((table) => 
            filters
                .filter(x => Object.prototype.hasOwnProperty.call(table, x))
                .map(x => SQL`${c(table[x as keyof Schema<T>], config)} LIKE ${value}`)
        )
        .reduce((a, x) => a.concat(a.strings[0] ? SQL` OR ${x}` : x), empty)

    return where.strings[0] ? SQL`(${where})` : empty;
}

const generateColumnList = ( ...columns: Array<ColumnMeta<Columns> | Fragment> ): Fragment => {
    const validColumns = columns.filter(hasColumn);

    if(validColumns.length === 0) return empty;

    return validColumns
        .map(column => isFragment(column) ? column : select({as:false}, column) )
        .reduce( (a, column, ix) => a.concat(ix > 0 ? SQL`, ${column}` : column), empty );
};


function groupBy <Columns>( ...columns: Array<ColumnMeta<Columns> | Fragment> ): Fragment {
    return generateColumnList(...columns);
}

//type Sort = {property:ColumnMeta<EnumType>, value?: 'ASC' | 'DESC'}
//type Sort = { property: string, value?: 'ASC' | 'DESC' } //TODO: quando tiver o front-end estudar possibilidade de enviar um ColumnMeta em property

type SortColumn = {
    column: ColumnMeta<Columns> | Fragment,
    direction?: 'ASC' | 'DESC'
};

/**
 * Gera um sort
 * @param sort Direção do sort
 * @param columns Colunas utilizadas no sort
 * @return Fragment
 */
const generateSort = (...sorts: SortColumn[]): Fragment => {
    const validSorts = sorts.filter(({ column }) => hasColumn(column));

    if(validSorts.length === 0) return empty;

    return validSorts
        .map(({ column, direction = 'ASC' }) => {
            const generatedColumn = isFragment(column)
                ? column
                : select({as:false}, column);

            return SQL`${generatedColumn} ${direction}`;
        })
        .reduce(
            (a, sort, index) =>
                a.concat(index > 0 ? SQL`, ${sort}` : sort),
            empty
        );
}

/**
 * Cria paginação para o SQL. Recebe um objeto com start e limit.
 * @param start 
 * @param limit
 * @return Fragment
 */
const generatePagination = (start:number, limit:number = 10): Fragment => {

    if(start < 0 || limit <= 0) return empty;

    return SQL` ${start}, ${limit}`
}

const colsForInsert = (data: Data, table: TableColumns<Columns>): { data: Data; columns: ColumnMeta<Columns>[] } => {
    const sanitizedData = { ...data }

    if (sanitizedData.hasOwnProperty('erased')) delete sanitizedData.erased

    const colsForInsert = Object.keys(sanitizedData).map((x) => table[x]).filter((x, i) => { if (x !== undefined) return x });

    return {
        data: sanitizedData,
        columns: colsForInsert
    };
}

/**
 * 
 * @param data 
 * @param table 
 * @returns 
 */
const setColumnsInsert = (data: Data, table: TableColumns<Columns>): Fragment => {
    const sanitizedData = { ...data }

    if (sanitizedData.hasOwnProperty('erased')) delete sanitizedData.erased

    const b = colsForInsert(data, table);
    const count = b.columns.length;

    const columnsForInsert = SQL`(`
        .concat(
            b.columns
                .map((x) => SQL`${c(table[x.name])}`)
                .reduce((a, x, i) => a.concat(i < count ? ', ' : empty).concat(x)),
        )
        .concat(')');

    return columnsForInsert;
}

/**
 * Gera os binds do INSERT de acordo com os campos que chegaram e se estão presentes na tabela
 * @param data Dados do request
 * @param table Tabela
 * @returns Fragment
 */
const setBindValuesInsert = (data: Data, table: TableColumns<Columns>): Fragment => {
    const b = colsForInsert(data, table);
    const count = b.columns.length;

    const bindValuesForInsert = SQL`(`
        .concat(
            b.columns
                .map((x) => SQL`${bind(b.data[x.name])}`)
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
//const buildInsert = (data: Data, table: TableColumns<Columns>): Fragment => {
//    const query = SQL`INSERT INTO ${t(table)} ${setColumnsInsert(data, table)} VALUES ${setBindValuesInsert(data, table)}`;
//    //console.log(query.sql,query.values)
//    return query;
//};

/**
 * Gera os binds do UPDATE de acordo com os campos que chegaram e se estão presentes na tabela
 * @param data Dados do request
 * @param table Tabela
 * @returns Fragmento
 */
const setBindValuesUpdate = (data: Data, table: TableColumns<Columns>, cfg = { prefix: false, quote: true }): Fragment => {
    const colsForUpdate = Object.keys(data).map((x) => table[x]).filter((x, i) => { if (x !== undefined) return x });
    const count = colsForUpdate.length;

    const bindValuesForUpdate = colsForUpdate
        .map((x) => SQL`${c(table[x.name], cfg)} = ${bind(data[x.name])}`)
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
//const buildUpdate = (data, filters, table: TableColumns<Columns>, config = { prefix: false, quote: true }) => {
//    const query = SQL`UPDATE ${t(table)}  SET ${setBindValuesUpdate(data, table)} WHERE ${generateFilters(table, filters, config)}`;
//
//    return query;
//};

/**
 * Constrói o DELETE
 * @param id ID do registro
 * @param table Tabela
 * @returns Fragmento
 */
//const buildDelete = (id: number, table: TableColumns<Columns>): Fragment => {
//    const query = SQL`UPDATE ${t(table)} SET ${c(table.erased)} = ${bind(1)} WHERE id = ${bind(id)}`;
//
//    return query;
//};

/**
 * Retorna um array de tabelas usadas para compor os joins
 * @param joins Joins
 * @returns Array
 */
//TODO: 
const extractTableJoins = (joins: Join[]) => {
    return joins.length != 0 ? joins.map((j) => j.table) : [];
};


const builderError = (scope: string, property: string): never => {
    throw new Error(
        `[QueryBuilder] O bloco .${scope}() ainda está aberto. ` +
        `Chame .end() antes de acessar .${property}().`
    );
};

type AppendQuery = (fragment: Fragment) => void;

const whereBuilder = <T, TMainBuilder>(
    mainBuilder: TMainBuilder,
    appendQuery: AppendQuery,
    fragments: Fragment[],
    filters: EnumType | undefined,
    tables: Tables<T>
) => {

    const filterBuilder = {
        additional(...fields: Array<string>) {
            fragments.push(additionalFilters(filters,...fields));

            return filterBuilderProxy;
        },

        raw(fragment: Fragment) {
            fragments.push(getRawFilters(fragment));

            return filterBuilderProxy;
        },

        search(data: SearchFilter) {
            fragments.push(searchFilter(tables, data));

            return filterBuilderProxy;
        },

        end() {
            const validFragments = fragments.filter(hasFragment);

            if(validFragments.length > 0) {
                const generatedFilters = validFragments.reduce(
                    (a, fragment, index) =>
                        a.concat(index > 0 ? SQL` AND ${fragment}` : fragment),
                    empty
                );

                appendQuery(SQL` WHERE ${generatedFilters}`);
            }

            return mainBuilder;
        }
    };

    const filterBuilderProxy = new Proxy(filterBuilder, {
        get(target, property, receiver) {
            if(Reflect.has(target, property)) {
                return Reflect.get(target, property, receiver);
            }

            builderError('where', String(property));
        }
    });

    return filterBuilderProxy;
};


const selectBuilder = (cfg = { alias: true, quote: true }) => {
    let query        = empty;
    let currentJoins: Join[] = [];
    const alias = cfg.alias;
    const quote = cfg.quote;
    const prefix = cfg.alias;

    const mainBuilder = {
        select(...columns: Array<ColumnsInput>) {
            const generatedColumns = generateColumns(...columns);

            if(!hasFragment(generatedColumns)) {
                throw new Error(
                    '[QueryBuilder] O método .select() deve receber ao menos uma coluna válida.'
                );
            }

            query = query.concat(SQL`SELECT ${generatedColumns}`);

            return mainBuilder;
        },

        from(table: TableColumns<Columns> | Fragment) {
            query = query.concat(SQL` FROM ${isFragment(table) ? table : t(table, {alias, quote})} `);

            return mainBuilder;
        },

        joins(joins: Join[] = []) {
            const rawJoins: Fragment[] = [];

            currentJoins = joins;

            const joinBuilder = {
                raw(fragment: Fragment) {
                    if(hasFragment(fragment)) {
                        rawJoins.push(fragment);
                    }
                
                    return joinBuilderProxy;
                },
            
                end() {
                    query = query.concat(generateJoins(currentJoins));
                
                    rawJoins.forEach(fragment => {
                        query = query.concat(fragment);
                    });
                
                    return mainBuilder;
                }
            };
        
            const joinBuilderProxy = new Proxy(joinBuilder, {
                get(target, property, receiver) {
                    if(Reflect.has(target, property)) {
                        return Reflect.get(target, property, receiver);
                    }
                
                    builderError('joins', String(property));
                }
            });
        
            return joinBuilderProxy;
        },

        where<T>( tables: Tables<T>, filters?: EnumType, op = '=') {
            const fragments: Fragment[] = [];
            const config = { prefix, quote }

            fragments.push(generateFilters(tables, filters, op, config));
            fragments.push(
                generateFilters(
                    extractTableJoins(currentJoins),
                    filters,
                    op,
                    config
                )
            );

            return whereBuilder(
                mainBuilder,
                fragment => query = query.concat(fragment),
                fragments,
                filters,
                tables
            );
        },

        having(f:Fragment){
            
            if(f.strings[0])
                query = query.concat(SQL` HAVING ${f}`)

            return mainBuilder;
        },

        groupBy(...columns: Array<ColumnMeta<Columns> | Fragment>) {
            const generatedGroupBy = groupBy(...columns);

            if(generatedGroupBy.strings[0]) {
                query = query.concat(SQL` GROUP BY ${generatedGroupBy}`);
            }

            return mainBuilder;
        },

        sort(...sorts: SortColumn[]) {
            const generatedSort = generateSort(...sorts);

            if(hasFragment(generatedSort)) {
                query = query.concat(SQL` ORDER BY ${generatedSort}`);
            }
        
            return mainBuilder;
        },

        pagination(start = 0, limit = 10) {
            const generatedPagination = generatePagination( start, limit );

            if(generatedPagination.strings[0]) {
                query = query.concat(SQL` LIMIT ${generatedPagination}`);
            }

            return mainBuilder;
        },

        build() {
            return query;
        }
    };

    return mainBuilder;
}

const insertBuilder = () => {
    let query = empty;
    let currentTable: TableColumns<Columns> | null = null;

    const mainBuilder = {
        into(table: TableColumns<Columns>) {
            query = query.concat(SQL`INSERT INTO ${t(table)}`);
            currentTable = table;

            return mainBuilder;
        },
        values(data: Data) {
            if (!currentTable) {
                throw new Error(
                    '[InsertBuilder] O método .into() deve ser chamado antes de .values().'
                );
            }

           query = query.concat(
               setColumnsInsert(data, currentTable)
           );
       
           query = query.concat(
               SQL` VALUES ${setBindValuesInsert(data, currentTable)}`
           );
       
           return mainBuilder;
        },
        build() {
            return query;
        }
    };

    return mainBuilder;
}

const updateBuilder = (cfg = { alias: false, quote: true }) => {
    let query = empty;
    let currentTable: TableColumns<Columns> | null = null;
    const alias = cfg.alias;
    const quote = cfg.quote;
    const prefix = cfg.alias;

    const mainBuilder = {
        table(table: TableColumns<Columns>) {
            query = query.concat(SQL`UPDATE ${t(table, { alias, quote })}`);
            currentTable = table;

            return mainBuilder;
        },
        set(data: Data) {
            
            if (!currentTable) {
                throw new Error(
                    '[UpdateBuilder] O método .table() deve ser chamado antes de .set().'
                );
            }

           query = query.concat(
               SQL` SET ${setBindValuesUpdate(data, currentTable, { prefix, quote })}`
           );
       
           return mainBuilder;
        },
        where<T>( filters: EnumType, op = '=' ) {
            const fragments: Fragment[] = [];

            const fields = Object.keys(filters)

            if (fields.length === 0) {
                throw new Error(
                    '[UpdateBuilder] Nenhum filtro foi informado'
                );
            }

            if (!currentTable) {
                throw new Error(
                    '[UpdateBuilder] O método .table() deve ser chamado antes do .where()'
                );
            }

            fragments.push(generateFilters(currentTable, filters, op = '=', { prefix, quote }));

            return whereBuilder(
                mainBuilder,
                fragment => query = query.concat(fragment),
                fragments,
                filters,
                currentTable
            );
        },
        build() {
            return query;
        }
    };

    return mainBuilder;
}

const deleteBuilder = (cfg = { alias: false, quote: true }) => {
    let query = empty;
    let currentTable: TableColumns<Columns> | null = null;
    const alias = cfg.alias;
    const quote = cfg.quote;
    const prefix = cfg.alias;

    const mainBuilder = {
        from(table: TableColumns<Columns>) {
            query = query.concat(SQL`DELETE FROM ${t(table, { alias, quote })}`);
            currentTable = table;

            return mainBuilder;
        },
        where<T>( filters: EnumType, op = '=' ) {
            const fragments: Fragment[] = [];

            const fields = Object.keys(filters)

            if (fields.length === 0) {
                throw new Error(
                    '[DeleteBuilder] Nenhum filtro foi informado'
                );
            }

            if (!currentTable) {
                throw new Error(
                    '[DeleteBuilder] O método .table() deve ser chamado antes do .where()'
                );
            }

            fragments.push(generateFilters(currentTable, filters, op, { prefix, quote }));

            return whereBuilder(
                mainBuilder,
                fragment => query = query.concat(fragment),
                fragments,
                filters,
                currentTable
            );
        },
        build() {
            return query;
        }
    };

    return mainBuilder;
}

const hasFragment = (fragment: Fragment) =>
    fragment.strings.some(x => x.length > 0);

const hasColumn = (column: ColumnMeta<Columns> | Fragment) =>
    !('strings' in column) || hasFragment(column);

const isFragment = (value: TableColumns<Columns> |ColumnMeta<Columns> | Fragment): value is Fragment => {
    return Array.isArray((value as Fragment).strings);
};

export {
    generateColumns,
    generateJoins,
    generateFilters,
    additionalFilters,
    getRawFilters,
    groupBy,
    generateSort,
    generatePagination,
    setColumnsInsert,
    setBindValuesInsert,
    setBindValuesUpdate,
    
    selectBuilder,
    insertBuilder,
    updateBuilder,
    deleteBuilder,

    EnumType,
};