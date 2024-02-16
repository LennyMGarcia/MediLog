if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
//Importar libreria de MySql modo Promise
const DB = require('../Utils/db_connect');
const Builder = require('../Utils/query_helper');

//Modelo que asistira en correr Queries en la Base de Dato

class Model {

    constructor(table) {
        this.table = table;
    }
    async get() {
        const query = new Builder(this.table);
        const [result, fields] = await DB.query(query.select_query('*'));
        return result;
    }
    async find(id) {
        this.id = id;
        const query = new Builder(this.table);
        const [result, fields] = await DB.query(query.select_query('*', 'id'), [this.id]);
        return result[0];
    }
    async delete(id) {
        this.id = id;
        const [result, fields] = await DB.query(`DELETE FROM ${this.table} WHERE id = ?`, [this.id]);
        return result;
    }
}

module.exports = Model;