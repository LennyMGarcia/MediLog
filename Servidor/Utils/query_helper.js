// Helper que ayuda con los queries de la base de datos
class QueryBuilder {
    constructor(table) {
        this.table = table;
    }
    select_query(columns = [], where = null) {
        if (!columns) return false;

        if (where) {
            const query = `SELECT ${columns.toString()} FROM ${this.table} WHERE ${where} = ?`;
            return query;
        }

        if (columns.length > 1) {
            const query = `SELECT ${columns.toString()} FROM ${this.table}`;
            return query;
        }

        const query = `SELECT ${columns} FROM ${this.table}`;
        return query;
    }
    insert_query(columns = [], values = []) {
        if (!columns || !values) return false;

        if (columns.length > 1) {
            const query_count = [];
            columns.forEach(element => {
                query_count.push("?");
            });
            const query = `INSERT INTO ${this.table} (${columns.toString()}) VALUES (${query_count.join(',')}) `;
            return query;
        }

        const query = `INSERT INTO ${this.table} (${columns}) VALUES (${values}) `;
        return query;
    }
    update_query(columns = [], values = [], where = null) {
        if (!where) return false;
        if (columns.length > 1) {

            const query_count = [];
            columns.forEach(element => {
                query_count.push("?");
            });
            const data_couples = [];

            //Funccion que mezcla los 2 arrays tipo pareja = valor, para el UPDATE tabla SET pareja = valor
            for (let i = 0; i < columns.length; i++) {
                const column = columns[i];
                const value = values[i];
                var q = "";
                if (typeof (value) === 'string') {
                    q = `${column} = '${value}'`;

                } else {
                    q = `${column} = ${value}`;
                }
                data_couples.push(q);
            }

            const query = `UPDATE ${this.table} SET ${data_couples.join(',')} where id =${where}`;
            return query;

        }
        const query = `UPDATE ${this.table} SET ${columns} =  ${values} where id =${where}`;
        return query;
    }
}


module.exports = QueryBuilder;