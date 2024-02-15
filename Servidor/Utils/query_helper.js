// Helper que ayuda con los queries de la base de datos
class QueryBuilder {
    constructor(table) {
        this.table = table;
    }
    select_query(columns = [], where = null) {
        if (where != null) {
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
    edit_query(table, columns = [], values = []) {
        ///INCOMPLETO
        if (columns.length > 1) {
            // const query = `INSERT INTO ${table} (${columns.toString()}) VALUES (${values.toString()}) `;
            ///return query;
        }

        // const query = `INSERT INTO ${table} (${columns}) VALUES (${values}) `;
        //return query;
    }
}


module.exports = QueryBuilder;